import { Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { tonnages } from '../../../../data/tonnages';
const { Option } = Select;
const TonnageInput = ({ onChange }) => {
    const [state, setState] = useState({
        tonnage: '',
        minimumQuantity: 0,
    });
    const handleChange = (name, data) => setState({ ...state, [name]: data });
    useEffect(() => {
        onChange(state);
    }, [state]);
    return (
        <Input.Group className="d-flex " compact>
            <Select
                className="input__form"
                style={{ width: '35%' }}
                placeholder="Tonnages"
                allowClear
                onChange={(v) => handleChange('tonnage', v)}
            >
                {tonnages.map((tonnage) => (
                    <Option value={tonnage} key={tonnage}>
                        {tonnage}
                    </Option>
                ))}
            </Select>
            <Input
                className="input__form "
                style={{ width: '65%' }}
                placeholder="Minimum Qty"
                onChange={(e) => handleChange('minimumQuantity', e.currentTarget.value)}
                type="number"
            />
        </Input.Group>
    );
};

export default React.memo(TonnageInput);
