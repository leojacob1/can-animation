import React from 'react';
import { Grommet, Box, Select, Text, Form, FormField, DateInput, Button } from 'grommet';
import STATES from '../data/us_state_centers.js';
import '../styles/ControlPanel.css';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

const MapSettingsForm = ({handleSubmit}) => {
  const [value, setValue] = React.useState({
    dimension: null,
    assetType: null,
    dataType: null,
    startDate: null,
    endDate: null
  });
  return (
    <Form
      value={value}
      onChange={nextValue => setValue(nextValue)}
      onReset={() => setValue({})}
      onSubmit={({ value }) => {handleSubmit(value)}}
    >
      <FormField name="dimension" htmlfor="dimension-id" label="Dimension" validate={(field) => {
        if (field !== "horizontal" && field !== "square") {
          return "Please choose a dimension";
        }
      }}>
        <Select
          name="dimension"
          id="dimension-id"
          options={['horizontal', 'square']}
        />
      </FormField>
      <FormField name="dataType" htmlfor="asset-type-id" label="Data" validate={(field) => {
        if (!field) {
          return "Select a data type";
        }
        if (field !== "Case Density") {
          return "We can only support case density at this time :/";
        }
      }}>
        <Select
          name="dataType"
          id="data-type-id"
          options={['Case Density', 'Infection Rate', 'Hospitalizations', 'Deaths']}
        />
      </FormField>
      <FormField name="assetType" htmlfor="asset-type-id" label="Asset Type" validate={(field) => {
        if (!field) {
          return "Select an asset type";
        }
        if (field !== "animation") {
          return "We can only support animations at this time :/";
        }
      }}>
        <Select
          name="assetType"
          id="asset-type-id"
          options={['animation', 'static']}
        />
      </FormField>
      {
        value.assetType === "animation" ?
      <div>
      <FormField name="startDate" htmlfor="start-date-id" label="Animation Start Date" validate={(field) => {
        if (!field) {
          return "Select a start date";
        }
        if (field >= new Date().toJSON()) {
          return "Please select an earlier start date.";
        }
      }}>
        <DateInput
          name="startDate"
          id="start-date-id"
          format="mm/dd/yyyy"
        />
      </FormField>
      <FormField name="endDate" htmlfor="end-date-id" label="Animation End Date" validate={(field, form) => {
        if (!field) {
          return "Select a start date";
        }
        if (field >= new Date().toJSON() || field <= form.startDate) {
          return "Please select an end date prior to your start date.";
        }
      }}>
        <DateInput
          name="endDate"
          id="end-date-id"
          format="mm/dd/yyyy"
        />
      </FormField>
      </div>
      : null }
      <FormField name="geographyType" htmlfor="geography-type-id" label="Animation Geography" validate={(field) => {
        if (!field) {
          return "Select a geography"
        }
      }}>
        <Select
          name="geographyType"
          id="geography-type-id"
          options={['Full USA', 'Single state']}
        />
      </FormField>
      {
        value.geographyType === "Single state" &&
        <FormField name="state" htmlfor="state-id" label="State" validate={(field) => {
          if (!field) {
            return "Select a state"
          }
        }}>
          <Select
            name="state"
            id="state-id"
            options={Object.keys(STATES)}
          />
        </FormField>
      }
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  )
}

const ControlPanel = ({handleSubmit, startAnimation, isDataLoaded}) => (
  <Grommet theme={theme}>
    <Box
      direction="column"
      border={{ color: 'brand', size: 'small' }}
      pad="large"
      className="container-control"
      margin="small"
      responsive={true}
    >
      <MapSettingsForm handleSubmit={handleSubmit}/>
      {isDataLoaded &&
        <Box direction="column">
          <Button primary label="Start animation" margin="medium" onClick={() => startAnimation()} />
          <Text>Or click anywhere on the map</Text>
        </Box>
      }
    </Box>
  </Grommet>
)

export default ControlPanel;
