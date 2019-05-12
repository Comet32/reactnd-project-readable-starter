import React from 'react'
import { Radio } from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default function SortRadio({list, onChangeSort, name, defaultSort}) {
  return (
    <React.Fragment>
      <span style={{ fontWeight: 'bolder', fontSize: '16px' }}>{name}：</span>
      <RadioGroup
        style={{ marginBottom: '20px' }}
        defaultValue={defaultSort}
        size="default"
      >
        {list.map(item => (
          <RadioButton
            onClick={() => onChangeSort(item)}
            key={item}
            value={item}
          >
            {item}
          </RadioButton>
        ))}
      </RadioGroup>
    </React.Fragment>
  )
}
