import { createSelector } from 'reselect';
import {
  map,
  find,
} from 'lodash';

export const getAllResearchers = state => state.users.allResearchers;
export const getUser = state => state.users.user;
export const getAllResearchedMocData = state => state.users.allResearchedMocs;
export const getPendingUsers = state => state.users.allPendingUsers;

export const combineMocNamesWithResearchers = createSelector([getAllResearchers, getAllResearchedMocData],
  (allResearchers, allResearchedMocs) => map(allResearchers, (researcher) => {
    const mocs = map(researcher.mocs, (moc) => {
      const mocData = find(allResearchedMocs, mocData => (mocData.id === moc.id));
      if (!mocData) {
          return moc;
      }
      return {
        ...moc,
        ...mocData,
      };
    })
    return {
        ...researcher,
        mocs,
    }
  })
);