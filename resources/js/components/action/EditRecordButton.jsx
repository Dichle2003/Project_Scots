import React, {useState} from "react";
import {Button, Tooltip} from "antd";
import {FaEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const EditRecordButton = ({record, apiUrl, onSuccess}) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleEdit = (id) => {
        navigate(`/${apiUrl}/${id}/edit`);
    };
    return (
        <Tooltip title="Sửa">
            <Button type="primary" onClick={() => handleEdit(record.id)}>
                <FaEdit className="w-4 h-4"/>
            </Button>
        </Tooltip>
    );
};

export default EditRecordButton;
