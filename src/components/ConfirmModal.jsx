import React , {useEffect} from 'react'
import  ReactDOM from 'react-dom'

function ConfirmModal({handleConfirm, handleDecline}) {
    useEffect( () => {
        document.body.style.overflowY = 'hidden'
        return () => {
            document.body.style.overflowY = 'scroll'
        }
    }, [])

  return ReactDOM.createPortal(
    <div id="myModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Are you sure you want to delete the server ? </p>
    <button onClick={handleConfirm} class="bg-red-500 text-white p-2 rounded-md">Yes</button>
    <button onClick={handleDecline} class="bg-green-500 text-white p-2 rounded-md">No</button>
  </div>
</div>,
    document.querySelector('.confirm_modal')
  )
}

export default ConfirmModal