import axios from "axios";
import {
  refreshTokenRequest,
  refreshTokenSuccess,
} from "../store/actions/auth";
import store from "../store";
import { refreshToken } from "./index";
import { endpoints } from "./endpoints";
import { getToken, decodeToken } from "../utils/token";

const isNeedRefresh = (user) => {
  const refreshThreshold = user.expiresIn;
  const time = new Date().getTime();
  return refreshThreshold < time;
};

export const privateAPI = axios.create({
  headers: { "content-type": "application/json" },
});

privateAPI.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getToken()}`;
  const auth = JSON.parse(localStorage.getItem("auth"));

  if (isNeedRefresh(auth)) {
    store.dispatch(refreshTokenRequest());
    return refreshToken({ refresh_token: auth.refresh })
      .then((response) => {
        if (response.status === 200) {
          const accessToken = response.data.access_token;
          const userObject = decodeToken(accessToken);
          localStorage.setItem("token", accessToken);
          localStorage.setItem(
            "auth",
            JSON.stringify({
              access: response.data.access_token,
              refresh: response.data.refresh_token,
              sub: userObject.sub,
              expiresIn: userObject.exp * 1000,
            })
          );
          store.dispatch(
            refreshTokenSuccess(accessToken, response.data.refresh_token)
          );
          privateAPI.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        }
        store.dispatch(refreshTokenSuccess({}));
        return Promise.reject(new Error("Refresh token expired"));
      })
      .catch((e) => {
        store.dispatch(refreshTokenSuccess({}));
        return Promise.reject(e);
      });
  }
  return config;
});

export const getContactGroups = (page) => {
  const url = endpoints.personalArea.contactGroups(page);

  return privateAPI.get(url);
};

export const createContactGroups = (data) => {
  const url = endpoints.personalArea.contactGroups(null);

  return privateAPI.post(url, data);
};

export const putContactGroups = (id, data) => {
  const url = endpoints.personalArea.actionContactGroups(id);

  return privateAPI.put(url, data);
};

export const deleteContactGroups = (id) => {
  const url = endpoints.personalArea.actionContactGroups(id);

  return privateAPI.delete(url);
};

export const getContacts = (id, page) => {
  const url = endpoints.personalArea.contacts(id, page);

  return privateAPI.get(url);
};

export const deleteContacts = (id) => {
  const url = endpoints.personalArea.importContacts.contacts(id);

  return privateAPI.delete(url);
};

export const putContactWithGroup = (id, data) => {
  const url = endpoints.personalArea.contacts(id);

  return privateAPI.put(url, data);
};

export const putContact = (contactGroupsId, contactId, data) => {
  const url = endpoints.personalArea.actionContacts(contactGroupsId, contactId);

  return privateAPI.put(url, data);
};

export const deleteContact = (contactGroupsId, contactId) => {
  const url = endpoints.personalArea.actionContacts(contactGroupsId, contactId);

  return privateAPI.delete(url);
};

export const filterContactCount = (id, sex, minAge, maxAge) => {
  const url = endpoints.personalArea.contactCount(id, sex, minAge, maxAge);

  return privateAPI.get(url);
};

export const putImportContactsFromFile = (id, file) => {
  const url = endpoints.personalArea.importContacts.contacts(id);

  return privateAPI.put(url, file);
};

export const putImportContactsValidate = (id, data) => {
  const url = endpoints.personalArea.importContacts.validateContacts(id);

  return privateAPI.put(url, data);
};

export const getImportContacts = (id, page) => {
  const url = endpoints.personalArea.importContacts.getContacts(id, page);

  return privateAPI.get(url);
};

export const saveImportContactsFromFile = (id, data) => {
  const url = endpoints.personalArea.importContacts.saveContacts(id);

  return privateAPI.put(url, data);
};

export const getAlphaNames = (isActive) => {
  const url = endpoints.personalArea.alphaNames(isActive);

  return privateAPI.get(url);
};

export const getCampaigns = (page) => {
  const url = endpoints.personalArea.campaigns(page);

  return privateAPI.get(url);
};

export const filterCampaigns = (phone, status, from, to) => {
  const url = endpoints.personalArea.filterCampaigns(phone, status, from, to);

  return privateAPI.get(url);
};

export const readCampaign = (id) => {
  const url = endpoints.personalArea.readCampaign(id);

  return privateAPI.get(url);
};

export const createCampaign = (data, page) => {
  const url = endpoints.personalArea.campaigns(page);

  return privateAPI.post(url, data);
};

export const getBalance = (sub) => {
  const url = endpoints.personalArea.getBalance(sub);

  return privateAPI.get(url);
};

export const getProfileInfo = (sub) => {
  const url = endpoints.personalArea.profile(sub);

  return privateAPI.get(url);
};

export const putProfileInfo = (data, sub) => {
  const url = endpoints.personalArea.profile(sub);

  return privateAPI.put(url, data);
};

export const getMessages = (page) => {
  const url = endpoints.personalArea.getMessages(page);

  return privateAPI.get(url);
};

export const getMessagesStatuses = () => {
  const url = endpoints.personalArea.messagesStatuses;

  return privateAPI.get(url);
};

export const createMessage = (data) => {
  const url = endpoints.personalArea.createMessage;

  return privateAPI.post(url, data);
};

export const filterMessages = (phone, status, from, to) => {
  const url = endpoints.personalArea.filterMessages(phone, status, from, to);

  return privateAPI.get(url);
};

export const readMessage = (id) => {
  const url = endpoints.personalArea.readMessage(id);

  return privateAPI.get(url);
};

export const createAlphaName = (data) => {
  const url = endpoints.personalArea.creatAlphaName;

  return privateAPI.post(url, data);
};

export const checkAlphaName = (name) => {
  const url = endpoints.personalArea.checkAlphaName(name);

  return privateAPI.get(url);
};

export const downloadTemplate = () => {
  const url = endpoints.personalArea.importContacts.downloadTemplate;

  return privateAPI.get(url, {
    responseType: "blob",
  });
};

export const downloadMessages = (phone, from, to) => {
  const url = endpoints.personalArea.downloadMessages(phone, from, to);

  return privateAPI.get(url, {
    responseType: "blob",
  });
};

export const downloadCampaigns = (phone, from, to) => {
  const url = endpoints.personalArea.downloadCampaigns(phone, from, to);

  return privateAPI.get(url, {
    responseType: "blob",
  });
};

export const getTVCampaigns = (status, page) => {
  const url = endpoints.personalArea.tvCampaigns.getTVCampaigns(status, page);

  return privateAPI.get(url);
};

export const createTVCampaigns = (data) => {
  const url = endpoints.personalArea.tvCampaigns.createTVCampaigns;

  return privateAPI.post(url, data);
};

export const getTVCampaignsStatuses = () => {
  const url = endpoints.personalArea.tvCampaigns.tvCampaignsStatuses;

  return privateAPI.get(url);
};
