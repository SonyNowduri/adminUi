import { Button, Table } from 'antd';
import {Component} from 'react'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import "antd/dist/antd.css"
import './index.css'
import EditUserModal from '../EditUserModal';

class UsersTable extends Component{
    // maintaining state that changes over the time
    state={
        data:[],
        selectedRowKeys:[],
        showModal:false,
        editObject : {}
        
    }                                                                 
// componenet life cycle method
    componentDidMount(){
        this.getUsersdata()
    }

    getUsersdata = async ()=>{
        const apiUrl =
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
      const options = {
        method: "GET",
      };
      const usersResponse = await fetch(apiUrl, options);
      const usersData = await usersResponse.json();
      const fullData = usersData.map((each)=>({
          id:each.id,
          name:each.name,
          email:each.email,
          role:each.role,
          key:each.id
      }))
      this.setState({ data: fullData });
    }

    // OnCHange the selected rows

    onSelectChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys})
    }
   
// to delete row
    onDeleteRow = (record) =>{
        const { data } = this.state;
        alert("Are You Sure You Want To Delete?")
        const userObject = data.filter((eachData) => eachData.id === record);
        const index = data.indexOf(userObject[0])
        delete data[index]
        this.setState({data:data})         

    }


// to edit the user data
    OnEditData = (record) =>{
        const { data} = this.state;
        const userObject = data.filter((eachData) => eachData.id === record);
        // const index = data.indexOf(userObject)
        this.setState({showModal:true,editObject:userObject[0]})

    }
// to close the modal
    closeModal = () =>{
        this.setState({showModal:false})
    }


// to delete the selected rows (multiple rows)
    onDeleteSelected = () =>{
        const {data,selectedRowKeys} = this.state
        for(let each of selectedRowKeys){
            const userObject = data.filter((eachData) => eachData.id === each);
            const index = data.indexOf(userObject[0])
            delete data[index]
        }
        this.setState({data:data})    
    }


    // on saving the data in editmodal
    onSaveDataList = (id,updatedEmail,updatedName,updatedRole) =>{
        const {data} = this.state
        const {name,email,role} = data
        const userObject = data.filter((eachData) => eachData.id === id);
        const userEditValue = userObject[0]
        if(updatedName !== "" && updatedRole!=="" && updatedEmail!==""){
            userEditValue.name = updatedName
            userEditValue.email = updatedEmail
            userEditValue.role = updatedRole
        }else if( updatedName !== ""){
            userEditValue.name = updatedName
        }else if(updatedRole!==""){
            userEditValue.role = updatedRole
        }else if(updatedEmail!==""){
            userEditValue.email = updatedEmail
        }
        else{
            userEditValue.name = name;
            userEditValue.email = email;
            userEditValue.role = role
        }
         this.closeModal()
        
    }


    render(){
        const {data,selectedRowKeys,showModal,editObject} = this.state
        const {searchUserInputValue} = this.props
        // to get the searched results
        const searchResults = data.filter(
            (eachData) =>
              eachData.name
                .toLowerCase()
                .includes(searchUserInputValue.toLowerCase()) ||
              eachData.email
                .toLowerCase()
                .includes(searchUserInputValue.toLowerCase) ||
              eachData.role.toLowerCase().includes(searchUserInputValue.toLowerCase)
          );
    //   to select rows
        const rowSelection = {
            selectedRowKeys,
            onChange:this.onSelectChange,
        }
        // to get the columns in the table 
        const columns=[
            {
                title:"Name",
                dataIndex:"name",
                key: "name",
                width:"33%"
            },
            {
                title:"Email",
                dataIndex:"email",
                key:"email",
                width:"33%"
               
            },
            {
                title:"Role",
                dataIndex:"role",
                key:"role",
                width:"53%"
            },{
                title:"Action",
                dataIndex:"id",
                key:"id",
                // to render the edit and delete icon in the table
                render: (record) => 
                
                    <div className="row">
                        
                      <Button className="button" icon={<EditOutlined />} onClick={()=> this.OnEditData(record)} />
                      <Button className="delete-button" icon={<DeleteOutlined /> } onClick={()=> this.onDeleteRow(record)}/>
                      </div>

            }
        ]
        return(
            // creating table using Table from antd
            <div className="users-data-container">
                <Table className="table" dataSource={searchResults} columns={columns} rowSelection={rowSelection}   pagination={{position:["bottomCenter"]}}/>
                <button type="button" className="delete-selected" onClick={this.onDeleteSelected}>Delete Selected</button>
                {showModal && <EditUserModal showModal={showModal} editObject={editObject} onSaveDataList={this.onSaveDataList} closeModal={this.closeModal}/>}
            </div>

        )
    }
}
export default UsersTable