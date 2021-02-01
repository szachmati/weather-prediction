import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Controller } from "react-hook-form";
import clsx from "clsx";

interface FormSelectProps {
  name: string;
  label: string;
  control: any;
  defaultValue: string;
  options: string[];
  classes: any[];
}

export const FormSelectAsController = (props: FormSelectProps) => {
  const { control, defaultValue, label, name, options, classes } = props;
  return (
    <FormControl variant="outlined" className={clsx(classes)}>
      <InputLabel variant="outlined">{label}</InputLabel>
      <Controller
        as={
          <Select
            placeholder="Choose weather condition you want to predict"
            label={label}
          >
            <MenuItem disabled value={null}>
              Choose a value
            </MenuItem>
            {options.map((option) => {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        }
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
