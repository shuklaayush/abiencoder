import React, { ChangeEvent, useMemo } from "react";

import Section from "../../components/Section";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Parameters } from "../../interfaces";
import FormGroup from "../../components/FormGroup";

import "./ParametersSection.css";
import MethodInputs from "./MethodInputs";
import Select from "../../components/Select";

interface ParametersSectionProps {
  abiFunctions: { [x: string]: any };
  onChange: (parameters: Parameters) => void;
  value: Parameters;
  errors?: string[];
}

const generateUintOptions = () => {
  const options = [];
  let i = 0;
  while (i <= 256) {
    if (i === 0) {
      options.push({ value: "uint", label: "Uint" });
      options.push({ value: "uint[]", label: "Uint[]" });
    } else {
      options.push({ value: `uint${i}`, label: `Uint${i}` });
      options.push({ value: `uint${i}[]`, label: `Uint${i}[]` });
    }
    i += 8;
  }
  return options;
};

const generateBytesOptions = () => {
  const options = [
    // {
    //   value: "byte",
    //   label: "Byte"
    // },{
    //   value: "byte[]",
    //   label: "Byte[]"
    // }
  ];
  let i = 0;
  while (i <= 32) {
    if (i === 0) {
      options.push({ value: "bytes", label: "Bytes" });
      options.push({ value: "bytes[]", label: "Bytes[]" });
    } else {
      options.push({ value: `bytes${i}`, label: `Bytes${i}` });
      options.push({ value: `bytes${i}[]`, label: `Bytes${i}[]` });
    }
    i += 1;
  }
  return options;
};

const argumentOptions = [
  { value: "address", label: "Address" },
  { value: "address[]", label: "Address[]" },
  { value: "string", label: "String" },
  ...generateUintOptions(),
  ...generateBytesOptions(),
  { value: "bool", label: "Bool" },
  { value: "bool[]", label: "Bool[]" },
];

const getFunctions = (abiFunctions: any) => {
  return Object.keys(abiFunctions).filter((item) => item !== "constructor");
};

const ParametersSection: React.FC<ParametersSectionProps> = ({
  abiFunctions,
  value,
  onChange,
  errors,
}) => {
  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const typeDescription = abiFunctions[name] || {};
    const inputs: any[] = (typeDescription.inputs || []).map((input: any) => {
      return {
        type: input.type,
        name: input.name,
        value: "",
      };
    });
    onChange({
      ...value,
      name,
      inputs,
    });
  };
  const onChangeType = (e: ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    const inputs: any[] = [];
    if (type === "constructor") {
      const typeDescription = abiFunctions["constructor"] || {};
      (typeDescription.inputs || []).forEach((input: any) => {
        inputs.push({
          type: input.type,
          name: input.name,
          value: "",
        });
      });
    }
    onChange({
      ...value,
      type,
      name: "",
      inputs,
    });
  };

  const onAddArgument = () => {
    onChange({
      ...value,
      inputs: [
        ...value.inputs,
        {
          type: "",
          value: "",
        },
      ],
    });
  };

  const onRemoveArgument = () => {
    onChange({
      ...value,
      inputs: value.inputs.slice(0, value.inputs.length - 1),
    });
  };

  const onChangeInputs = (inputs: any[]) => {
    onChange({
      ...value,
      inputs,
    });
  };

  const isConstructor = value.type === "constructor";
  const typesOptions = useMemo(
    () => [
      {
        value: "constructor",
        label: "constructor",
      },
      {
        value: "function",
        label: "function",
      },
    ],
    []
  );

  const functions = useMemo(() => getFunctions(abiFunctions), [abiFunctions]);

  return (
    <Section
      className="section-choose"
      title="Or enter your parameters manually"
    >
      <div className="row choose">
        <div className="col-md-3">
          <FormGroup label="Function type">
            <div>
              <Select
                value={value.type}
                onChange={onChangeType}
                options={typesOptions}
              />
            </div>
          </FormGroup>
        </div>
        <div className="col-md-9">
          {!isConstructor && (
            <Input
              className="method-input__value"
              onChange={onChangeName}
              value={value.name}
              suggestions={functions}
              placeholder="Enter function name without arguments"
              type="text"
              name="listen"
            />
          )}
        </div>
      </div>
      <MethodInputs
        value={value.inputs}
        onChange={onChangeInputs}
        options={argumentOptions}
        errors={errors}
      />
      <div className="section-choose__buttons">
        <Button className="add-param" onClick={onAddArgument}>
          Add parameter
        </Button>
        <Button className="remove-param" onClick={onRemoveArgument}>
          Remove
        </Button>
      </div>
    </Section>
  );
};

export default ParametersSection;
