import React from "react";

import { useAbiEncoder } from "./hooks";

import ParseSection from "./sections/ParseSection";
import ParametersSection from "./sections/ParametersSection";
import EncodedSection from "./sections/EncodedSection";

function App() {
  const {
    abi,
    encoded,
    onChange,
    onParse,
    onClear,
    parseError,
    parameters,
    abiFunctions,
    encodeErrors,
  } = useAbiEncoder();

  return (
    <>
      <ParseSection
        onChange={onChange("abi")}
        value={abi}
        onParse={onParse}
        onClear={onClear}
        parseError={parseError}
      />
      <ParametersSection
        onChange={onChange("parameters")}
        value={parameters}
        abiFunctions={abiFunctions}
        errors={encodeErrors}
      />
      <EncodedSection value={encoded} />
    </>
  );
}

export default App;
