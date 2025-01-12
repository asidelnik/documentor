import {
  FontSpec,
  ScriptableAndScriptableOptions,
  ScriptableChartContext,
} from 'chart.js';

export const titleFontOptions: ScriptableAndScriptableOptions<
  Partial<FontSpec>,
  ScriptableChartContext
> = {
  size: 20,
  family: 'Roboto',
};
