import React, {useState} from 'react';
import {Table} from 'antd';
import {createStyles} from 'antd-style';
import useTableStyle from "@/components/styles/tableStyle";

const useStyle = createStyles(({css, token}) => {
    const {antCls} = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                    ${antCls}-table-body,
                    ${antCls}-table-content {
                        scrollbar-width: thin;
                        scrollbar-color: #eaeaea transparent;
                    }
                }
            }
        `,
    };
});

const columns = [
    {
        title: 'Full Name',
        width: 100,
        dataIndex: 'name',
        key: 'name',
        fixed: 'start',
    },
    {
        title: 'Age',
        width: 100,
        dataIndex: 'age',
        key: 'age',
        fixed: 'start',
        sorter: true,
    },
    {title: 'Column 1', dataIndex: 'address', key: '1'},
    {title: 'Column 2', dataIndex: 'address', key: '2'},
    {title: 'Column 3', dataIndex: 'address', key: '3'},
    {title: 'Column 4', dataIndex: 'address', key: '4'},
    {title: 'Column 5', dataIndex: 'address', key: '5'},
    {title: 'Column 6', dataIndex: 'address', key: '6'},
    {title: 'Column 7', dataIndex: 'address', key: '7'},
    {title: 'Column 8', dataIndex: 'address', key: '8'},
    {title: 'Column 9', dataIndex: 'address', key: '9'},
    {title: 'Column 10', dataIndex: 'address', key: '10'},
    {title: 'Column 11', dataIndex: 'address', key: '11'},
    {title: 'Column 12', dataIndex: 'address', key: '12'},
    {title: 'Column 13', dataIndex: 'address', key: '13'},
    {title: 'Column 14', dataIndex: 'address', key: '14'},
    {title: 'Column 15', dataIndex: 'address', key: '15'},
    {title: 'Column 16', dataIndex: 'address', key: '16'},
    {title: 'Column 17', dataIndex: 'address', key: '17'},
    {title: 'Column 18', dataIndex: 'address', key: '18'},
    {title: 'Column 19', dataIndex: 'address', key: '19'},
    {title: 'Column 20', dataIndex: 'address', key: '20'},
    {
        title: 'Action',
        key: 'operation',
        fixed: 'end',
        width: 100,
        render: () => <a>action</a>,
    },
];
const dataSource = [
    {key: '1', name: 'Olivia', age: 32, address: 'New York Park'},
    {key: '2', name: 'Ethan', age: 40, address: 'London Park'},
    {key: '3', name: 'Olivia', age: 32, address: 'New York Park'},
    {key: '4', name: 'Ethan', age: 40, address: 'London Park'},
    {key: '5', name: 'Olivia', age: 32, address: 'New York Park'},
    {key: '6', name: 'Ethan', age: 40, address: 'London Park'},

    {key: '7', name: 'Olivia', age: 32, address: 'New York Park'},
    {key: '8', name: 'Ethan', age: 40, address: 'London Park'},
    {key: '9', name: 'Olivia', age: 32, address: 'New York Park'},
    {key: '10', name: 'Ethan', age: 40, address: 'London Park'},
    {key: '11', name: 'Olivia', age: 32, address: 'New York Park'},
    {key: '12', name: 'Ethan', age: 40, address: 'London Park'},

];
const Home = () => {
    const {styles} = useTableStyle();
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
        <div
            className="border bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <Table
                className={styles.customTable}
                columns={columns}
                dataSource={dataSource}
                scroll={{x: 'max-content'}}
                pagination={{
                    current: page,
                    pageSize: pageSize,
                    total: dataSource.length,
                    showSizeChanger: true,
                    pageSizeOptions: [10, 20, 50, 100],
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} / ${total}`,
                    onChange: (page, pageSize) => {
                        setPage(page);
                        setPageSize(pageSize);
                    },
                }}
            />
        </div>

    );
};
export default Home;
