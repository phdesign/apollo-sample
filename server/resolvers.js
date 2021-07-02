const { paginateResults } = require("./utils");

module.exports = {
  Query: {
    async launches(_, { pageSize = 20, after }, { dataSources }) {
      let allLaunches = await dataSources.launchAPI.getAllLaunches();
      allLaunches.reverse();
      const launches = paginateResults({
        after,
        pageSize,
        results: allLaunches,
      });
      return {
        launches,
        cursor: launches.length ? launches[launches.length - 1].cursor : null,
        hasMore: launches.length
          ? launches[launches.length - 1].cursor !==
            allLaunches[allLaunches.length - 1].cursor
          : false,
      };
    },

    launch(_, { id }, { dataSources }) {
      return dataSources.launchAPI.getLaunchById({ launchId: id });
    },

    me(_, __, { dataSources }) {
      return dataSources.userAPI.findOrCreateUser();
    },
  },

  Mission: {
    missionPatch(parent, { size }) {
      return size === "SMALL"
        ? parent.missionPatchSmall
        : parent.missionPatchLarge;
    },
  },

  Launch: {
    async isBooked(launch, _, { dataSources }) {
      return await dataSources.userAPI.isBookedOnLaunch({
        launchId: launch.id,
      });
    },
  },

  User: {
    async trips(user, _, { dataSources }) {
      const trips = await dataSources.userAPI.getTripsByUser({
        userId: user.id,
      });
      if (!trips.length) return [];
      const launchIds = trips.map((trip) => trip.launchId);
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds,
      });
      return launches || [];
    },
  },

  Mutation: {
    async login(_, { email }, { dataSources }) {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) {
        user.token = Buffer.from(email).toString("base64");
        return user;
      }
    },

    async bookTrips(_, { launchIds }, { dataSources }) {
      const results = await dataSources.userAPI.bookTrips({ launchIds });
      const launches = await dataSources.launchAPI.getLaunchesByIds({
        launchIds: launchIds.map((id) => parseInt(id)),
      });

      return {
        success: results && results.length === launchIds.length,
        message:
          results.length === launchIds.length
            ? "trips booked successfully"
            : `the following launches couldn't be booked: ${launchIds.filter(
                (id) => !results.includes(id)
              )}`,
        launches,
      };
    },

    async cancelTrip(_, { launchId }, { dataSources }) {
      await dataSources.userAPI.cancelTrip({ launchId });
      const launch = await dataSources.launchAPI.getLaunchById({ launchId });
      return {
        success: true,
        message: "trip cancelled",
        launches: [launch],
      };
    },
  },
};
