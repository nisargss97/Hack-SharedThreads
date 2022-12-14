// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { useEffect, useState } from 'react';
import * as microsoftTeams from "@microsoft/teams-js";
import { Card, Flex, Text, Button, CardHeader, CardBody } from '@fluentui/react-northstar'

/**
 * The 'PeoplePicker' component for 
 * of your app.
 */
const PeoplePicker = () => {
  const [selectedPeople, setSelectedPeople] = useState<microsoftTeams.people.PeoplePickerResult[]>([]);
  useEffect(() => {
    microsoftTeams.app.initialize()
  })

  // Method to select people using people picker control
  function selectPeople() {
    microsoftTeams.people.selectPeople().then((people) => {
      setSelectedPeople(people);
    }).catch((error) => {
      if (error.message) {
        alert(" ErrorCode: " + error.errorCode + error.message);
      }
      else {
        alert(" ErrorCode: " + error.errorCode);
      }
    });
  }

  return (
    <>
      {/* Card for People Picker */}
      <Card>
        <CardHeader>
          <Text content="People Picker (Mobile Only)" weight="bold" />
        </CardHeader>
        <CardBody>
          <Flex column gap="gap.small">
            <Text content="SDK used: " weight="semibold" />
            <Text content="microsoftTeams" />
            <Text content="Method: " weight="semibold" />
            <Text content="teams.people" />
            <Button content="People Picker" onClick={selectPeople} />
          </Flex>
          <Text>Selected {selectedPeople.length} people</Text>
          {selectedPeople.length !== 0 && selectedPeople.map((item: microsoftTeams.people.PeoplePickerResult, index) => {
            return (
              <Text>{item.displayName}</Text>
            )
          })}
        </CardBody>
      </Card>
    </>
  );
}

export default PeoplePicker;