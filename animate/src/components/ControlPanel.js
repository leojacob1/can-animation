import React from 'react';
import { Grommet, Box, Select, Text, Form, FormField, DateInput, Button } from 'grommet';

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
      <FormField name="dimension" htmlfor="dimension-id" label="Dimension">
        <Select
          name="dimension"
          id="dimension-id"
          options={['horizontal', 'square']}
        />
      </FormField>
      <FormField name="dataType" htmlfor="asset-type-id" label="Data">
        <Select
          name="dataType"
          id="data-type-id"
          options={['Case Density', 'Infection Rate', 'Hospitalizations', 'Deaths']}
        />
      </FormField>
      <FormField name="assetType" htmlfor="asset-type-id" label="Asset Type">
        <Select
          name="assetType"
          id="asset-type-id"
          options={['Animation', 'Static']}
        />
      </FormField>
      {
        value.assetType === "Animation" ?
      <div>
      <FormField name="startDate" htmlfor="start-date-id" label="Animation Start Date">
        <DateInput
          name="startDate"
          id="start-date-id"
          format="mm/dd/yyyy"
        />
      </FormField>
      <FormField name="endDate" htmlfor="end-date-id" label="Animation End Date">
        <DateInput
          name="endDate"
          id="end-date-id"
          format="mm/dd/yyyy"
        />
      </FormField>
      </div>
      : null }
      <Box direction="row" gap="medium">
        <Button type="submit" primary label="Submit" />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  )
}

const ControlPanel = ({handleSubmit}) => (
  <Grommet theme={theme}>
    <Box
      direction="column"
      border={{ color: 'brand', size: 'large' }}
      pad="large"
      width="medium"
    >
      <MapSettingsForm handleSubmit={handleSubmit}/>
    </Box>
  </Grommet>
)

export default ControlPanel;
