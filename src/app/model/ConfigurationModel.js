export default class ConfigurationModel {
  constructor(
    lockUsersManage,
    lockProjectsManage,
    underMaintenance,
    pinnedProjectsOrder,
    tokenExpiresInHours,
  ) {
    this.lockUsersManage = lockUsersManage;
    this.lockProjectsManage = lockProjectsManage;
    this.underMaintenance = underMaintenance;
    this.pinnedProjectsOrder = pinnedProjectsOrder;
    this.tokenExpiresInHours = tokenExpiresInHours;
  }
}
