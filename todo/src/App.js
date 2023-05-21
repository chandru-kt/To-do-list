import React from 'react';
import './App.css';
import {Input, Table} from "antd";
import  { useState } from 'react'
import {Button} from 'antd';
import { Typography } from 'antd';
import {Modal,Form,DatePicker,Select} from 'antd';
import {EditOutlined,DeleteOutlined,SearchOutlined} from '@ant-design/icons'
import moment from 'moment';

function App() {

  const [isEditing, setIsEditing] = useState(false) 

  const [editingTask, setEditingTask] = useState({})


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('OPEN');


  const [isDivVisible, setIsDivVisible] = useState(false);

  const [dataSource, setDataSource] = useState([
    
      {
        timestamp: new Date().toLocaleString(), // "2022-04-06T08:00:00.000Z"
        title: 'Call doctor',
        description: 'Schedule an appointment with Dr. Smith',
        dueDate: '2022-04-20',
        tags: ['Health'],
        status: 'DONE',
      },

      {
        timestamp: new Date().toLocaleString(), // "2022-04-06T08:00:00.000Z"
        title: 'Call dhoni',
        description: 'Schedule an appointment with MHS',
        dueDate: '2022-04-28',
        tags: ['Entertainment'],
        status: 'ONGOING',
      }
    
  ])

  
   
  const columns=[
    {
      key: "timestamp",
      title:'Timestamp created',
      dataIndex: 'timestamp',
      width: '20%',
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp), 
      sortDirections: ["descend","ascend"],
    },
    {
      title: 'Title',
      dataIndex: 'title',
      length: 100,
      sorter: (a, b) => a.title.localeCompare(b.title), 
      sortDirections: ["descend","ascend"],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search title"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={confirm}
            size="small"
            style={{ marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small">Reset</Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
    
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: '30%',
      length:1000,
      sorter: (a, b) => a.description.localeCompare(b.description), 
      sortDirections: ["descend","ascend"],
      
    
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search title"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={confirm}
            size="small"
            style={{ marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small">Reset</Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => record.dueDate.includes(value),
    },
    {
      title: 'Tag',
      dataIndex: 'tags',
      width: '15%',
      filters: [
        {
          text: "Health",
          value: "Health",
        },
        {
          text: "Entertainment",
          value: "Entertainment",
        },
        {
          text: "Dating",
          value: "Dating",
        },
        {
          text: "Outing/trip",
          value: "Trip",
        },
      ],
      onFilter: (value,record)=>record.tags.indexOf(value)==0,

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search tags"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={confirm}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={confirm}
            size="small"
            style={{ marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={clearFilters} size="small">Reset</Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) => record.tags.includes(value),

    },
    {
      title: 'Status',
      dataIndex: 'status',
      filters: [
        {
          text: "OPEN",
          value: "OPEN",
        },
        {
          text: "WORKING",
          value: "WORKING",
        },
        {
          text: "DONE",
          value: "DONE",
        },
        {
          text:"OVERDUE",
          value:"OVERDUE",
        },

      ],
      onFilter: (value,record)=>record.status.indexOf(value)==0,
    },

    {
      title:'Actions',
      render:(record)=>{
        return <>
        <EditOutlined 
        onClick={()=>{
          onEditTask(record)
        }}

        style={{ color : "blue", marginLeft:12}}
        
        />


        <DeleteOutlined 
          onClick={()=>{
            onDeleteTask(record)
          }}
        
           style={{ color : "red", marginLeft: 12}}/>
        </>
      }
    }

  ];
/*
  const onAddTask=(values)=>{
    const newTask = {
      timestamp: new Date().toLocaleString(),
      title: values.title,
      description: values.description,
      dueDate: values.dueDate,
      tags: values.tags,
      status: values.status,
      
    }


    setDataSource(pre=>{
      return [...pre,newTask]
    })
  }
  */
  
 
  
  
  

  const onDeleteTask=(record)=>{
    Modal.confirm({
      title: "Are you Sure to delete this task ??",
      okText: "Yes",
      okType: "danger",
      onOk:()=>{
        setDataSource(pre=>{
          return pre.filter((Task) => Task.timestamp !== record.timestamp );
        });
      }
    })
    
  };

  const onEditTask=(record)=>{
     setIsEditing(true)
     setEditingTask({...record})

  }
 
  const resetEditing=()=>{
    setIsEditing(false)
    setEditingTask(null)
  }

  
  const { Option } = Select;

  

  const onAddTask = () => {
    const newTask = {
      timestamp: new Date().toLocaleString(),
      title: title,
      description: description,
      dueDate: dueDate ? dueDate.format('YYYY-MM-DD') : null,
      tags: tags,
      status: status,
    };

    setDataSource(pre => {
      return [...pre, newTask];
    });
  };
  
  
  const handleButtonClick = () => {
    setIsDivVisible(!isDivVisible);
  };

  const { Title, Text } = Typography;
 
  

  return (
    <div className="App">
      <header className="App-header">
      
      <div style={{ padding: '50px 0' ,color: 'white'}}>
      <Title level={1} style={{color:'whitesmoke', fontFamily:"cursive"}}>Task-Marker</Title>
      <Text style={{color:"darkgoldenrod"}}>A simple day-to-day task register</Text>
      </div>


      <Button  type="primary" onClick={handleButtonClick} style={{marginBottom:50}}>Add New Task</Button>


      <div style={{ display: isDivVisible ? "block" : "none" }}>
      <table class="table">
      <>
      <tr>
      <td>Title</td>
      <td>
      <Input
        placeholder="Enter Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{
          width: 150
        }}
        required
      />
      </td>
      </tr>
      <tr>
      <td>Description</td>
      <td>
      <Input.TextArea
        placeholder="Enter Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />
      </td>
      </tr>
      <tr>
      <td>Due Date</td>
      <td>
      <DatePicker
        placeholder="Select Due Date"
        value={dueDate}
        onChange={date => setDueDate(date)}
      />
      </td>
      </tr>
      <tr>
      <td>Tags</td>
      <td>
      <Select
        mode="tags"
        placeholder="Select Tags"
        value={tags}
        onChange={value => setTags(value)}
        style={{width:150}}
        
        >
        <Option value="Health">Health</Option>
        <Option value="Entertainment">Entertainment</Option>
        <Option value="Dating">Dating</Option>
        <Option value="Trip">Trip</Option>
      </Select>
      </td>
      </tr>
      <tr>
      <td>Status</td><td>
      <Select
        defaultValue="OPEN"
        placeholder="Select Status"
        onChange={value => setStatus(value)}
        style={{width:150}}
        required
      >
        <Option value="OPEN">OPEN</Option>
        <Option value="WORKING">WORKING</Option>
        <Option value="DONE">DONE</Option>
        <Option value="OVERDUE">OVERDUE</Option>
      </Select>
      </td>
      </tr>
      <tr><td>
      <Button type="primary" onClick={onAddTask}>
        Add Task
      </Button>
      </td>
      </tr>
     </>

     </table>
     </div>
    


      <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 5, total: 50, showSizeChanger: true }} 
      >
      </Table>
      <Modal
        title="Edit Task"
        open={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing()
        }}
        onOk={() =>
          {
            setDataSource(pre=>{
                return pre.map (Task=>{
                   if(Task.timestamp === editingTask.timestamp){
                    return editingTask
                   }
                   else{
                    return Task
                   }
                })
            })
            resetEditing()
          }
        }
      >
      
      <Input value={editingTask?.title} onChange={(e)=>{
        setEditingTask(pre => {
          return {...pre,title: e.target.title}
        })
      }}/>
      <Input value={editingTask?.description} onChange={(e)=>{
        setEditingTask(pre => {
          return {...pre,description: e.target.description}
        })
      }}/>
      <Input value={editingTask?.dueDate} onChange={(e)=>{
        setEditingTask(pre => {
          return {...pre,dueDate: e.target.dueDate}
        })
      }}/>
      <Input value={editingTask?.tags} onChange={(e)=>{
        setEditingTask(pre => {
          return {...pre,tags: e.target.tags}
        })
      }}/>
      <Input value={editingTask?.status} onChange={(e)=>{
        setEditingTask(pre => {
          return {...pre,status: e.target.status}
        })
      }}/>

      </Modal>



     
      
    
      </header>
    </div> 
  );
}






export default App;
