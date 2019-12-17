import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { FormFieldProps, Form, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLTextAreaElement>, FormFieldProps { }

export const TextAreaInput:React.FC<IProps> = () => {
    return (
        <div>
            
        </div>
    )
}
