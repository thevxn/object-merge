# object-merge

Small, fast, simple and 0 dependency utility for merging two objects.

## Install

`npm i @savla-dev/object-merge`

## Usage

```ts
import { merge } from "@savla-dev/object-merge";

const object1 = {
    foo: 'bar',
    baz: [1, 2 ,3],
    nestedObject: {
        also: 'works'
    }
}

const object2 = {
    key: 'value',
    baz: [4,5,6],
    nestedObject: {
        also: 'this value overrides the one from object1 due to this object having priority',
        anotherKey: 'anotherValue'
    }
}

// Returns the resultingObject below
merge(object1, object2, {
  priorityObject: 'right',
  useStructuredClone: true,
  mergeArrays: true
})

const resultingObject = {
  foo: 'bar',
  baz: [ 1, 2, 3, 4, 5, 6 ],
  nestedObject: {
    also: 'this value overrides the one from object1 due to this object having priority',
    anotherKey: 'anotherValue'
  },
  key: 'value'
}
```

## Options

- priorityObject
  - Specifies the object to take priority during merging and overriding values at identical keys.
  - `"left" | "right"`
- mergeArrays
  - Specifies whether arrays should be merged or overriden by the array from the priorityObject. True by default.
  - `boolean`
- useStructuredClone
  - Specifies whether to use the structuredClone() function to clone the object that is not priorityObject. True by default. If set to false, the `merge()` function will mutate the object not set as priorityObject.
  - `boolean`
