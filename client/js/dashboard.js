function goAdd(){
    window.location.href = "add_medicine.html";
}

function editMedicine(){
    alert("Edit medicine");
}

function deleteMedicine(){

    const answer = confirm("Delete this medicine?");

    if(answer){
        alert("Medicine deleted");
    }

}