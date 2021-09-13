import { Component } from "react";
import {Modal,Input} from 'antd'
import './index.css'

class EditUserModal extends Component{
    state = {updatedName:"",updatedEmail:"",updatedRole:""}

    onChangeName = (value) =>{
        this.setState({updatedName:value})
    }

    onChangeEmail = (value) =>{
        this.setState({updatedEmail:value})
    }

    onChangeRole = (value) =>{
        this.setState({updatedRole:value})
    }
// to save the updated data and passing values to onSaveDataList function
    onSaveData = () =>{
        const {updatedName,updatedEmail,updatedRole} = this.state
        const {onSaveDataList,editObject,closeModal} = this.props
        console.log(updatedName)
        closeModal()
        onSaveDataList(editObject.id,updatedEmail,updatedName,updatedRole)
        
        

    }

  
    render(){
        const {showModal,closeModal,editObject} = this.props
        const {name,role,email} = editObject
        return(
            <Modal title="Edit User" visible={showModal} onCancel={closeModal} onOk={this.onSaveData} okText="Save">
                <div>
                <label htmlFor="name">Name</label>
                <Input id="name" defaultValue={name} onChange={(e)=> this.onChangeName(e.target.value)} />
                </div>
                <div>
                <label htmlFor="email">Email</label>
                <Input id="name" defaultValue={email}  onChange={(e)=> this.onChangeEmail(e.target.value)}/>
                </div>
                <div>
                <label htmlFor="role">Role</label>
                <Input  id="role" defaultValue={role}  onChange={(e)=> this.onChangeRole(e.target.value)}/>
                </div>
            </Modal>
        )
    }
}
export default EditUserModal