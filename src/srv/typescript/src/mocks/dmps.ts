export const mockDMP = {
  contact: {
    contact_id: {
      identifier: "u934hu5tu9245hth24t",
      type: "other"
    },
    mbox: "solo@example.com",
    name: "Han Solo"
  },
  contributor: [
    {
      contributor_id: {
        type: "orcid",
        identifier: "https://orcid.org/0000-0000-0000-0000"
      },
      mbox: "chewy@example.com",
      name: "Chewbacca",
      role: ["http://credit.niso.org/contributor-roles/investigation"]
    }
  ],
  created: "2024-07-09T21:50:24Z",
  dataset: [
    {
      metadata: [
        {
          description: "ISO 19115 - An internationally-adopted schema for describing geographic information and services.",
          metadata_standard_id: {
            type: "url",
            identifier: "https://rdamsc.bath.ac.uk/api2/m22"
          }
        }
      ],
      personal_data: "unknown",
      sensitive_data: "yes",
      dataset_id: {
        type: "other",
        identifier: "1552"
      },
      description: "This dataset will include coordinates and timing results of trial runs",
      preservation_statement: "",
      type: "dataset",
      title:"Time trials",
      distribution: [
        {
          download_url: "https://example.com/dataset/1552",
          host:{
            title: "Outer rim repo",
            url: "https://example.com/repo"
          },
          license: [
            {
              license_ref: "https://spdx.org/licenses/CC-BY-4.0.json",
              start_date: "2025-07-28T00:00:00Z"
            }
          ],
          title: "Distribution of time trials",
          data_access: "open"
        }
      ],
      technical_resource: [
        {
          name: "Millenium Falcon"
        }
      ],
      keyword: ["Kessel", "parsec"]
    },
  ],
  dmp_id: {
    identifier: "https://example.com/9u4ht9245ht0245ht0",
    type: "url"
  },
  ethical_issues_description: "Might be something sensitive",
  ethical_issues_exist: "yes",
  ethical_issues_report: "https://example.com/ethical_issues_report",
  language: "eng",
  modified: "2024-07-10T22:27:28Z",
  project: [
    {
      description: "Can we make the Kessel run in under 12 parsecs",
      end: "2025-09-29",
      funding: [
        {
          funder_id: {
            identifier: "https://ror.org/021nxhr62",
            type: "ror"
          },
          funding_status: "granted",
          grant_id: {
            identifier: "https://example.com/awardsearch/showAward?AWD_ID=79ty8293y4t9",
            type: "url"
          },
          name: "National Science Foundation (nsf.gov)"
        }
      ],
      start: "2025-09-28",
      title: "Kessel run"
    }
  ],
  title: "DMP for the Kessel run"
};



