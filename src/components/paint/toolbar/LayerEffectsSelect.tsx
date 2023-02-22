import { Select } from "@chakra-ui/react";
import { FC, memo } from "react";
import { LayerEffects, t_LayerEffect } from "@/types";
import { chakra } from "@chakra-ui/react";
import { ILayerEffectsSelectProps } from "@/components/paint/toolbar";

function transformCamel(str: string) {
  return str.replace(/[A-Z]/g, (res) => " " + res.toLowerCase());
}

const LayerEffectsSelect: FC<ILayerEffectsSelectProps> = memo(({ value, onChange }) => {
  return (
    <Select textTransform="capitalize" value={value} onChange={onChange}>
      {(Object.keys(LayerEffects) as t_LayerEffect[]).map((key) => (
        <chakra.option value={LayerEffects[key]} key={key}>
          {transformCamel(key)}
        </chakra.option>
      ))}
    </Select>
  );
});

export default LayerEffectsSelect;
