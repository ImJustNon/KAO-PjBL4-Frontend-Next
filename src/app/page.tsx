"use client"
import Image from "next/image";
import logoImg from "../assets/images/logo.png";
import { useEffect, useState } from "react";
import { StudentDataForm } from "@/types/studentFormData.type";
import { ModalConfig } from "@/types/modalConfig.type";
import axios, { AxiosResponse } from "axios";
import { RegisterResponse } from "@/types/registerResponse.type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleXmark, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";


export default function Home() {
	
	const [studentFormData, setStudentFormData] = useState<StudentDataForm>({
		studentId: "",
		studentPrefix: "",
		studentFirstName: "",
		studentLastName: "",
		studentNickName: "",
	});
	const [isPrefixSelectBoxOpen, setIsPrefixSelectBoxOpen] = useState<boolean>(false);

	const [modalConfig, setModalConfig] = useState<ModalConfig>({
		modalIcon: "",
		modalIconColor: "",
		modalTitle: "",
		modalDescription: ""
	});

	async function handleSubmit(){
		try {
			const response: AxiosResponse<RegisterResponse, StudentDataForm> = await axios.post("https://kao-pjbl4-backend.vercel.app/api/v1/student/register", {
				studentId: studentFormData.studentId,
				studentPrefix: studentFormData.studentPrefix,
				studentFirstname: studentFormData.studentFirstName,
				studentLastname: studentFormData.studentLastName,
				studentNickname: studentFormData.studentNickName
			}, {
				headers: {
					'Content-Type': 'application/json',
				}
			});

			if(response.data.status === "FAIL"){
				setModalConfig({
					modalIcon: faCircleXmark,
					modalIconColor: "#eb7171",
					modalTitle: "Register Failed",
					modalDescription: response.data.message
				});
				handleOpenModal();
			}
			else if(response.data.status === "OK"){
				setModalConfig({
					modalIcon: faCircleCheck,
					modalIconColor: "#79eb71",
					modalTitle: "Register Success",
					modalDescription: ""
				});   
				handleOpenModal();
			}
		}
		catch(e){
			console.error(e);
			setModalConfig({
				modalIcon: faCircleXmark,
				modalIconColor: "#eb7171",
				modalTitle: "Somthing went Wrong",
				modalDescription: e
			});   
			handleOpenModal(); 
		}
	}

	function handleOpenModal(){
		const getModalElement = document.getElementById("infoModal") as HTMLDialogElement;
		getModalElement.showModal();
	}


	return (
		<>  
			<div className="min-h-screen flex flex-col items-center">
				
				<div className="w-full flex flex-col grow bg-white md:max-w-md">
					<div className="bg-[#3489eb] p-4 flex flex-row items-center justify-center gap-3 shadow-xl">
						{/* <!-- Nav Title --> */}
						<Image className="w-14 h-14 ml-3" src={logoImg} alt="logo img" />
						<div className="font-medium text-lg text-white w-full text-start">Notification System of Picking-up and Dropping-off Students Via LINE Notify</div>
					</div>
					<div className="flex flex-col px-4 py-2 my-auto">
						{/* <!-- Title --> */}
						<div className="font-medium text-3xl text-center mb-14">{"Register Student's Info"}</div>
						<div className="w-full flex flex-col gap-y-5 mt-5">
							{/* <!-- Student ID --> */}
							<div className="flex flex-col gap-2">
								<div className="text-xl pl-3">{"Student's ID Number"}</div>
								<input type="text" maxLength={11} inputMode="numeric" pattern="\d{1,11}" className="input input-bordered input-primary w-full text-center shadow-md bg-white" placeholder="Please fill student's ID number" onChange={(event) => setStudentFormData(prev =>{
									return {
										...prev,
										studentId: event.target.value
									}
								})} />
							</div>
							{/* <!-- Student Firstname --> */}
							<div className="flex flex-col gap-2">
								<div className="text-xl pl-3">Prefix and Firstname</div>
								<div className="grid grid-cols-3 gap-2">
									{/* <!-- Prefix --> */}
									<div className="col-span-1 input input-bordered input-primary w-full relative cursor-pointer group items-center flex shadow-md bg-white" onClick={() => setIsPrefixSelectBoxOpen(prev => !prev)}>
										<span className={`text-md text-gray text-center w-full cursor-pointer mr-2 ${studentFormData.studentPrefix.length !== 0 ? "text-black" : "text-[#ababab]"}`}>{studentFormData.studentPrefix.length !== 0 ? studentFormData.studentPrefix : "Prefix"}</span><i className="fa-solid fa-chevron-down"></i>
										<div className={`absolute flex-col top-[55px] left-0 rounded-md bg-white w-full border-2 border-solid border-[#014694] px-1 py-1 gap-1 shadow-xl ${isPrefixSelectBoxOpen ? "flex" : "hidden"}`}>
											<div className="text-center cursor-pointer hover:bg-[#e3e3e3] active:bg-[#c4c4c4] rounded-md py-2 duration-300" onClick={() => setStudentFormData(prev => {
												return {
													...prev,
													studentPrefix: "MISS"
												}
											})}>
												Miss (Girl)
											</div>
											<div className="text-center cursor-pointer hover:bg-[#e3e3e3] active:bg-[#c4c4c4] rounded-md py-2 duration-300" onClick={() => setStudentFormData(prev => {
												return {
													...prev,
													studentPrefix: "MASTER"
												}
											})}>
												Master (Boy)
											</div>
										</div>
									</div>
									<input type="hidden" id="input_student_prefix" />
									{/* <!-- Firstname --> */}
									<input type="text" className="col-span-2 input input-bordered input-primary w-full text-center shadow-md bg-white" placeholder="Please fill student's firstname" onChange={(event) => setStudentFormData(prev =>{
										return {
											...prev,
											studentFirstName: event.target.value
										}
									})} />
								</div>
							</div>
							{/* <!-- Student Lastname --> */}
							<div className="flex flex-col gap-2">
								<div className="text-xl pl-3">Lastname</div>
								<input type="text" className="input input-bordered input-primary w-full text-center shadow-md bg-white" placeholder="Please fill student's lastname" onChange={(event) => setStudentFormData(prev =>{
									return {
										...prev,
										studentLastName: event.target.value
									}
								})} />
							</div>
							{/* <!-- Student Nickname --> */}
							<div className="flex flex-col gap-2">
								<div className="text-xl pl-3">Nickname</div>
								<input type="text" className="input input-bordered input-primary w-full text-center shadow-md bg-white" placeholder="Please fill student's nickname" onChange={(event) => setStudentFormData(prev =>{
									return {
										...prev,
										studentNickName: event.target.value
									}
								})} />
							</div>
						</div>
						{/* <!-- Submit Button --> */}
						<div className="text-center bg-[#0777f7] w-fit mx-auto mt-5 text-2xl px-20 py-2 text-white rounded-lg cursor-pointer hover:bg-[#64a8f5] active:bg-[#a2ccfc] duration-300 shadow-xl" onClick={() => handleSubmit()}>Register</div>
						{/* <!-- Alert Modal --> */}
						<dialog id="infoModal" className="modal modal-bottom md:modal-middle">
							<div className="modal-box">
								<div className="flex flex-col gap-2">
									<span className="mx-auto"><FontAwesomeIcon icon={modalConfig.modalIcon as IconDefinition} size="6x" style={{ color: modalConfig.modalIconColor }}></FontAwesomeIcon></span>
									<div className="text-3xl font-medium text-center mt-3">{modalConfig.modalTitle}</div>
									<div className="text-xl font-medium text-center">{String(modalConfig.modalDescription)}</div>
								</div>
								<div className="modal-action">
									<form method="dialog">
										<button className="btn">Close</button>
									</form>
								</div>
							</div>
						</dialog>
					</div>
				</div>
			</div>
		</>
	);
}
