# useForm

一个简单的`React`表单字段管理 hooks

## usage

```jsx
import React, { useEffect } from "react";
import useForm from "./useForm";

function Form() {
  // all fields should init
  const form = useForm({ name: "zhang yu", phone: "", address: "chengdu" });

  const { createField, setFieldsValue, getFieldsValue } = form;

  useEffect(() => {
    // get fields
    console.log(getFieldsValue(["name"]));
    console.log(getFieldsValue(["name", "address"]));
    // get all
    console.log(getFieldsValue());
  });

  // set
  const set = () => setFieldsValue({ name: "haha", phone: "18181919" });

  return (
    <div>
      {createField("name")(<input type="text" />)}
      {createField("phone")(<input type="text" />)}
      {createField("address")(<input type="text" />)}
      <button onClick={set}>set</button>
    </div>
  );
}

export default Form;
```

字段需要先初始化，会传递`value`和`onChange`给`createField`的组件
