import React, { useEffect, useState } from 'react';
import { usePublications, useFeed, useExplorePublications, useSearchPublications, PublicationMetadataFilters } from '@lens-protocol/react-web';

// dont nest hooks
export const createFilter = (params={})=>{
  const {postId} = params
  const metadataFilter: PublicationMetadataFilters = {
    // restrictPublicationMainFocusTo?: PublicationMainFocus[];
    // restrictPublicationLocaleTo?: string;
    // showPublicationsWithContentWarnings?: {
    //   oneOf: PublicationContentWarning[];
    // };
    restrictPublicationTagsTo: {
      all: ["beachsignalv2145"]
    }

    // now load all first
    // filter.postId
  };

  return {
    metadataFilter
  }

}
