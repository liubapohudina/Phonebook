import React from "react";
import { createPortal } from 'react-dom';
import styles from './contactsList.module.css';
import PropTypes from "prop-types";
import { Loader } from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectFilterContacts} from '../../redux/contacts/contacts-selector';
import { fetchContacts, fetchDeleteContacts } from "../../redux/contacts/contacts-operations";
import { useEffect, useState } from "react";
import Modal from "../PortalModal/Modal/Modal";



const ContactList = () => {
  const { items, isLoading } = useSelector(selectFilterContacts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
 
  
  const filteredContacts = useSelector(selectFilterContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);



  const onClickDelete = (id) => {
    dispatch(fetchDeleteContacts(id));
  }

  const openModal = (id) => {
    setIsModalOpen(true);
    setCurrentId(id);
  }

 
const elements = items ? (
    items.map(item => (
      <li className={styles.itemContacts} key={item.id}>
        <p className={styles.contactInfo}>{item.name} <a className={styles.link} href={`tel:${item.number}`}>{item.number}</a></p>
        <div className={styles.btns}>
          <button id={item.id} className={styles.btn} onClick={() => onClickDelete(item.id)} type="button">Delete</button>
          <button id={item.id} className={styles.btn} onClick={() => openModal(item.id)} type="button">Edit</button>
        </div> 
  </li>
    ))
) : (
    filteredContacts.map(item => (
        <li className={styles.itemContacts} key={item.id}>
        <p className={styles.contactInfo}>{item.name}  {item.number}</p>
        <div className={styles.btns}>
          <button id={item.id} className={styles.btn} onClick={() => onClickDelete(item.id)} type="button">Delete</button>
          <button id={item.id} className={styles.btn} onClick={() => openModal(item.id)} type="button">Edit</button>
        </div>  
        </li>
    ))
);

  

  return (
  <>
      {isLoading && <Loader />}
      {isModalOpen && createPortal(
        <Modal currentId={currentId} onClose={() => setIsModalOpen(false)} />,
        document.querySelector('#modal-root')
      )}
      <div className="contactsList">
        <ul className={styles.contactsList}>{elements}</ul>
      </div>
    </>
  );
}

export default ContactList;

ContactList.propTypes = {
  filteredContacts: PropTypes.array,
  onClickDelete: PropTypes.func,
};
