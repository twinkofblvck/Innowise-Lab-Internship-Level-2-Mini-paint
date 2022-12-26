import { Select } from "@chakra-ui/react";
import { ChangeEvent, FC, memo } from "react";
import { LayerEffects, t_LayerEffect } from "../../../types/paint";
import { chakra } from "@chakra-ui/react";

interface ILayerEffectsSelectProps
{
  value: LayerEffects | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function transformCamel(str: string)
{
  return str.replace(/[A-Z]/g, res => " " + res.toLowerCase());
}

const LayerEffectsSelect: FC<ILayerEffectsSelectProps> = memo(({ value, onChange }) =>
{
  return (
    <Select textTransform="capitalize" value={value} onChange={onChange}>
      {(Object.keys(LayerEffects) as t_LayerEffect[]).map(key =>
        <chakra.option value={LayerEffects[key]} key={key}>{transformCamel(key)}</chakra.option>)}
    </Select>
  );
});

export default LayerEffectsSelect;