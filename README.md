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
    arrayToMerge: [4,5,6],
    nestedObject: {
        also: 'this value overrides the one from object1 due to this object having priority'
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
