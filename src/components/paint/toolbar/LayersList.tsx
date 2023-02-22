import { Flex, Heading } from "@chakra-ui/react";
import { ChangeEvent, FC, memo, MouseEvent, useCallback } from "react";
import { Layer, ILayer } from "@/utils/paint/control";
import { LayerItem, LayerEffectsSelect, LayerActions, ILayersListProps } from "@/components/paint/toolbar";
import { LayerEffects } from "@/types";

const LayersList: FC<ILayersListProps> = memo(({ layers, currLayer, setLayers, setCurrLayerId }) => {
  const toggleLayerVisibility = useCallback(
    (e: MouseEvent, index: number) => {
      e.stopPropagation();
      setLayers((layers) =>
        layers.map((layer, i) => {
          if (i === index) layer.isVisible = !layer.isVisible;
          return layer;
        })
      );
    },
    [setLayers]
  );

  const renameCurrentLayer = useCallback(
    (name: string) => {
      setLayers((layers) =>
        layers.map((layer) => {
          if (layer === currLayer) layer.name = name;
          return layer;
        })
      );
    },
    [currLayer, setLayers]
  );

  const setLayerEffect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setLayers((layers) =>
        layers.map((layer) => {
          if (layer === currLayer) layer.effect = e.target.value as LayerEffects;
          return layer;
        })
      );
    },
    [currLayer, setLayers]
  );

  const moveCurrentLayer = useCallback(
    (direction: (arr: ILayer[], i: number) => ILayer[]) =>
      currLayer && setLayers((layers) => direction([...layers], layers.indexOf(currLayer))),
    [currLayer, setLayers]
  );

  const removeCurrentLayer = useCallback(
    () => setLayers((layers) => layers.filter((layer) => layer !== currLayer)),
    [currLayer, setLayers]
  );

  const addLayer = useCallback(() => setLayers((layers) => layers.concat(Layer.Create())), [setLayers]);

  return (
    <Flex direction="column" gap={3}>
      <Heading mb={6} size="md">
        Layers
      </Heading>
      <LayerEffectsSelect value={currLayer?.effect} onChange={setLayerEffect} />
      {layers.map((layer, i) => (
        <LayerItem
          key={layer.id}
          isCurrent={layer === currLayer}
          layer={layer}
          setCurrentId={setCurrLayerId}
          toggleVisibility={(e) => toggleLayerVisibility(e, i)}
        />
      ))}
      <LayerActions
        add={addLayer}
        remove={removeCurrentLayer}
        move={moveCurrentLayer}
        rename={renameCurrentLayer}
        removalBlocked={layers.length < 2}
      />
    </Flex>
  );
});

export default LayersList;
