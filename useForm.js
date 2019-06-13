import React, { useState } from "react";

const useForm = initialValue => {
    const [formFields, setFields] = useState(initialValue);

    const onFieldChange = fieldName => value => {
        if (typeof value === "object") value = value.target.value;
        setFields(prev => ({ ...prev, [fieldName]: value }));
    };

    const verification = fields => {
        const isArray = Array.isArray(fields);
        const notExits = (isArray ? fields : Object.keys(fields)).filter(
            field => !(field in formFields)
        );
        if (notExits.length)
            throw new Error(
                `the field "${notExits.toString()}" is not exist,you should initialize it first`
            );
    };

    const setFieldsValue = fields => {
        verification(fields);
        setFields(prev => ({ ...prev, ...fields }));
    };

    const getFieldsValue = fields => {
        if (fields === undefined) return formFields;
        verification(fields);
        return fields.reduce((values, field) => {
            values[field] = formFields[field];
            return values;
        }, {});
    };

    const createField = fieldName => {
        if (fieldName === undefined || fieldName === "")
            throw new Error("field must has name");
        return Component => {
            return React.cloneElement(Component, {
                value: formFields[fieldName],
                onChange: onFieldChange(fieldName)
            });
        };
    };

    return { createField, setFieldsValue, getFieldsValue };
};

export default useForm;
