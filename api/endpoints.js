import config from "../config";

export const baseApiURL = config.BASE_API_URL;
export const authApiURL = config.AUTH_API_URL;
export const personalAreaApiUrl = config.PERSONAL_AREA_API_URL;
export const refreshToken = `${authApiURL}/connect/token`;

export const endpoints = {
  auth: {
    login: `${authApiURL}/connect/token`,
    generateOtp: `${personalAreaApiUrl}/api/Account/register`,
    verifyOtp: `${personalAreaApiUrl}/api/Account/activate`,
    resetPassword: `${personalAreaApiUrl}/api/Account/reset-password`,
    confirmNewPassword: `${personalAreaApiUrl}/api/Account/confirm-new-password`,
    checkRegister: `${personalAreaApiUrl}/api/Account/check-register`,
  },
  SMS: {
    testSMS: `${baseApiURL}/SmsService.svc/SendFreeMessage`,
  },
  personalArea: {
    contactGroups: (page) =>
      `${personalAreaApiUrl}/api/contactGroups` + (page ? `?Page=${page}` : ""),
    actionContactGroups: (id) =>
      `${personalAreaApiUrl}/api/contactGroups/${id}`,
    contacts: (id, page) =>
      `${personalAreaApiUrl}/api/contactGroups/${id}/contacts` +
      (page ? `?Page=${page}` : ""),
    actionContacts: (contactGroupsId, contactId) =>
      `${personalAreaApiUrl}/api/contactGroups/${contactGroupsId}/contacts/${contactId}`,
    contactCount: (id, sex, minAge, maxAge) =>
      `${personalAreaApiUrl}/api/ContactGroups/${id}/contacts-count` +
      (sex === true || sex === false ? `?Sex=${sex}` : "") +
      (minAge
        ? `${sex === true || sex === false ? "&" : "?"}MinAge=${minAge}`
        : "") +
      (maxAge
        ? `${
            sex === true || sex === false || minAge ? "&" : "?"
          }MaxAge=${maxAge}`
        : ""),
    creatAlphaName: `${personalAreaApiUrl}/api/Senders`,
    alphaNames: (isActive) =>
      `${personalAreaApiUrl}/api/Senders/my` +
      (isActive === true || isActive === false ? `?isActive=${isActive}` : ""),
    checkAlphaName: (name) =>
      `${personalAreaApiUrl}/api/Senders/check-name?name=${name}`,
    campaigns: (page) =>
      `${personalAreaApiUrl}/api/Campaigns` + (page ? `?Page=${page}` : ""),
    filterCampaigns: (phone, status, from, to) =>
      `${personalAreaApiUrl}/api/Campaigns` +
      (phone ? `?Phone=${phone}` : "") +
      (status ? `${!phone ? "?" : "&"}Status=${status}` : "") +
      (from ? `${!phone && !status ? "?" : "&"}From=${from}` : "") +
      (to ? `${!phone && !status && !from ? "?" : "&"}To=${to}` : ""),
    readCampaign: (id) => `${personalAreaApiUrl}/api/Campaigns/${id}`,
    getBalance: (id) => `${personalAreaApiUrl}/api/UserProfiles/${id}/balance`,
    profile: (id) =>
      `${personalAreaApiUrl}/api/UserProfiles${id ? `/${id}` : ""}`,
    getMessages: (page) =>
      `${personalAreaApiUrl}/api/Messages/statistic-detail` +
      (page ? `?Page=${page}` : ""),
    messagesStatuses: `${personalAreaApiUrl}/api/Messages/statuses`,
    filterMessages: (phone, status, from, to) =>
      `${personalAreaApiUrl}/api/Messages/statistic-detail` +
      (phone ? `?Phone=${phone}` : "") +
      (status ? `${!phone ? "?" : "&"}Status=${status}` : "") +
      (from ? `${!phone && !status ? "?" : "&"}From=${from}` : "") +
      (to ? `${!phone && !status && !from ? "?" : "&"}To=${to}` : ""),
    downloadMessages: (phone, from, to) =>
      `${personalAreaApiUrl}/api/Messages/statistic-excel` +
      (phone ? `?Phone=${phone}` : "") +
      (from ? `${!phone ? "?" : "&"}From=${from}` : "") +
      (to ? `${!phone && !from ? "?" : "&"}To=${to}` : ""),
    downloadCampaigns: (phone, from, to) =>
      `${personalAreaApiUrl}/api/Campaigns/excel` +
      (phone ? `?Phone=${phone}` : "") +
      (from ? `${!phone ? "?" : "&"}From=${from}` : "") +
      (to ? `${!phone && !from ? "?" : "&"}To=${to}` : ""),
    readMessage: (id) => `${personalAreaApiUrl}/api/Messages/${id}`,
    createMessage: `${personalAreaApiUrl}/api/Messages`,
    importContacts: {
      contacts: (id) =>
        `${personalAreaApiUrl}/api/ContactGroups/${id}/contacts/import`,
      validateContacts: (id) =>
        `${personalAreaApiUrl}/api/ContactGroups/${id}/contacts/import-validate`,
      getContacts: (id, page) =>
        `${personalAreaApiUrl}/api/ContactGroups/${id}/contacts/import` +
        (page ? `?page=${page}` : ""),
      saveContacts: (id) =>
        `${personalAreaApiUrl}/api/ContactGroups/${id}/contacts/import-save`,
      downloadTemplate: `${personalAreaApiUrl}/api/ContactGroups/contacts-template`,
    },
    getTVChannels: `${personalAreaApiUrl}/api/Channels`,
    tvCampaigns: {
      getTVCampaigns: (status, page) =>
        `${personalAreaApiUrl}/api/TvCampaigns` +
        (status === 0 || status ? `?Status=${status}` : "") +
        (page ? `${status === 0 || status ? "&" : "?"}Page=${page}` : ""),
      createTVCampaigns: `${personalAreaApiUrl}/api/TvCampaigns`,
      readTVCampaigns: (id) => `${personalAreaApiUrl}/api/TvCampaigns/${id}`,
      tvCampaignsStatuses: `${personalAreaApiUrl}/api/TvCampaigns/statuses`,
    },
  },
};
