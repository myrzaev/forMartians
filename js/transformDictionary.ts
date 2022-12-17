interface IDictionary {}

interface IRawDictionaryItem {
  key: string;
  value: string;
}

export const transformDictionary = (
  mapper: IDictionary,
  inputDictionary: IRawDictionaryItem[] = []
): IDictionary => {
  const temp = inputDictionary.reduce(
    (prev, next) => ({ ...prev, [next.key]: next.value }),
    {}
  );

  return Object.keys(mapper).reduce(
    (prev, next) => ({ ...prev, [next]: temp[mapper[next]] }),
    {}
  );
};
