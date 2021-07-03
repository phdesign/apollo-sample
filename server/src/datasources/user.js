const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize({ context }) {
    this.context = context;
  }

  async isBookedOnLaunch({ launchId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.trips.findAll({
      where: { userId, launchId },
    });
    return found && found.length > 0;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;
    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async getTripsByUser({ userId }) {
    const trips = await this.store.trips.findAll({
      where: { userId },
    });
    return trips.map((trip) => trip.dataValues);
  }

  async bookTrips({ launchIds }) {
    const userId = this.context.user.id;
    if (!userId) return;

    let results = [];

    for (const launchId of launchIds) {
      const resp = await this.bookTrip({ launchId });
      if (resp) results.push(resp);
    }

    return results;
  }

  async bookTrip({ launchId }) {
    const userId = this.context.user.id;
    if (!userId) return;

    const res = await this.store.trips.findOrCreate({
      where: {
        launchId,
        userId,
      },
    });
    return res && res.length ? res[0].get() : false;
  }

  async cancelTrip({ launchId }) {
    const userId = this.context.user.id;
    if (!userId) return;
    await this.store.trips.destroy({ where: { launchId, userId } });
  }
}

module.exports = UserAPI;
