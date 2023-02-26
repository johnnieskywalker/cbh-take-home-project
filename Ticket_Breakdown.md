# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

### Epic custom external IDs for Agents
- **Description:** Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.

- **Acceptance Criteria:**
  - [ ] When a Facility creates an Agent, they can optionally provide a custom external id for that Agent
  - [ ] When a Facility creates a Shift, they can optionally provide a custom external id for the Agent assigned to that Shift
  - [ ] When a Facility generates a report, the Agent ids on the report are the custom external ids provided by the Facility, if they exist, or the internal database id if they don't

## Tasks

### Task 1: Add custom external id to Agent model
- **Description:** 
Migration script:
- Add a new nullable `external_id` field to the Agent model
- Insert external_ids of Agents if provided
- Add `external_id` to VIEW make sure it is returned by GraphQL API
**Estimate**: 2 story points
**Acceptance Criteria:**
- [ ] Migration script is written - Agent table now contains `external_id` , for provided Agents fields are updated
- [ ] GraphQL API returns `external_id` for Agents
- [ ] Migration script is run on staging
- [ ] Migration script is tested on staging
- [ ] Migration script is run on production

### Task 2:  Update getShiftsByFacility to include external ids
- **Description:**
- Update `getShiftsByFacility` to return external ids if they exist
- Update the return value of getShiftsByFacility to include the custom id in the metadata for each Agent
- Test the new functionality to ensure that ids are included in the Shift metadata
**Estimate**: 1 story point
**Acceptance Criteria:**
- [ ] `getShiftsByFacility` returns external ids in the metadata for each Agent
- [ ]  Unit tests for `getShiftsByFacility` are updated to include external ids
- [ ]  Integration test scenarios that include checking the metadata for Agents are updated to include external ids
- [ ] `getShiftsByFacility` is tested on staging if metadata exists for Agents
- [ ] `getShiftsByFacility` is tested on production if metadata does not exist for Agents

### Task 3: Update generateReport to use external ids
- **Description:**
- Modify the generateReport function to use the external id instead of the internal database id when generating the report for each Agent
- Test the new functionality to ensure that custom ids are used in the report instead of internal database ids
**Estimate**: 1 story point
**Acceptance Criteria:**
- [ ] `generateReport` uses external ids instead of internal database ids if external exists
- [ ] Unit tests for `generateReport` are updated to include external ids
- [ ] Integration test scenarios that include checking the report for Agents are updated to include external ids
- [ ] `generateReport` is tested on staging
- [ ] `generateReport` is tested on production

### Task 4: Allow facilities to provide external ids for Agents
- **Description:**
- Update the existing code that allows Facilities to create and edit Agents to also allow them to set a custom id for each Agent, update `POST` and `PATCH` endpoints for Agent
- Return 400 Bad Request response if `external_id` is not unique for Facility
- Return 400 Bad Request response if `external_id` is in invalid format
- Update the Agents table in the database to validate that custom ids are unique per Facility
- Test the new functionality to ensure that custom ids can be set and validated for uniqueness
**Estimate**: 3 story points
**Acceptance Criteria:**
- [ ] `POST` and `PATCH` endpoints for Agent allow setting `external_id`
- [ ] `POST` and `PATCH` endpoints for Agent return 400 Bad Request response if `external_id` is not unique for Facility
- [ ] `POST` and `PATCH` endpoints for Agent return 400 Bad Request response if `external_id` is in invalid format
- [ ] Agents table in the database validates that custom ids are unique per Facility
- [ ] Integration test scenarios that include POST and PATCH endpoints for Agent are updated to include `external_id`
- [ ] `POST` and `PATCH` endpoints for Agent are tested on staging
- [ ] `POST` and `PATCH` endpoints for Agent are tested on production

### Task 5:  Update API documentation to reflect external id functionality and new external dependencies
- **Description:**
- Update the API documentation to include information about the new custom id field and how to use updated endpoints
- Integrate the API documentation with Swagger for improved API documentation management
- Update the API documentation generation pipeline to automatically build and deploy the documentation website to AWS S3 for public access
- Update the Notion page documentation with more detailed use cases for the new `external_id` field
- Update the Postman collection for the API with example requests using the new `external_id` field
**Estimate**: 2 story points
**Acceptance Criteria:**
- [ ] API documentation is updated to include information about the new custom id field and how to use updated endpoints
- [ ] API documentation is integrated with Swagger for improved API documentation management
- [ ] API documentation generation pipeline is updated to automatically build and deploy the documentation website to AWS S3 for public access
- [ ] Notion page documentation is updated with more detailed use cases for the new `external_id` field
- [ ] Postman collection in `postman_collections` repository is updated with example requests using the new `external_id` field