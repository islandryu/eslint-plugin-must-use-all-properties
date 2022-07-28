# eslint-plugin-must-use-all-properties

This eslint plugin detects properties that are not used in destructuring assignments even though they are defined as types.

## Why?
When using typescript, it is often the case that there are properties that are no longer used even though they were defined with a type.

For example, when defining types for React Props.
``` ts
type Props = { name: string;
  age: number;
}

export const Component: React.FC<Props> = (
  {
    name
  }
) => {
  return (<>{name}</>)
} 

```


## Installation

```sh
npm i -D eslint-plugin-must-use-all-properties
```

In **.eslintrc.js**:

```js
  "plugins": [
    "must-use-all-properties",
  ],
  rules: {"must-use-all-properties/must-use-all-properties": ["error"]}
```
Put the comment out `//must-use-all-properties` before the destructuring assignment where you want to show the error

## usage 


```ts
type Props = { name: string;
  age: number;
}

export const Component: React.FC<Props> = (
  // must-use-all-properties
  {
    name
  }
) => {
  return (<>{name}</>)
} 
```

## Contributing

Welcome

## License

MIT
