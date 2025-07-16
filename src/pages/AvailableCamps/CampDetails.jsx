import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Spin,
  message,
} from "antd";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import {
  ArrowLeftOutlined,
  ConsoleSqlOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import axiosSecure from "../../Hooks/AxiousSecure";
import useCurrentUser from "../../Hooks/useController";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const { TextArea } = Input;
const { Option } = Select;

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const CampDetails = () => {
  const { id } = useParams();
  console.log("id: ", id);
  const navigate = useNavigate();

  // Replace this with your actual user auth logic
  // Example user object with profile data
  const { currentUser, isLoading } = useCurrentUser();
  console.log("current  user: ", currentUser);
  console.log("user loading: ", isLoading);

  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registeredParticipants, setRegisteredParticipants] = useState(null);

  // react-hook-form setup
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // fetching camps data by id
  useEffect(() => {
    const fetchCamp = async () => {
      try {
        setLoading(true);
        setFetchError(null);

        const res = await axiosSecure.get(`https://medicamp-server-jade.vercel.app/camps/${id}`);
        if (!res.data) {
          setFetchError("Camp not found");
        } else {
          setCamp(res.data);
        }
      } catch (err) {
        setFetchError("Error fetching camp data");
      } finally {
        setLoading(false);
      }
    };

    // ✅ Only run fetch when user is ready and id exists
    if (!isLoading && currentUser && id) {
      fetchCamp();
    }
  }, [isLoading, currentUser, id]);

  // fetching registered participants by id
  useEffect(() => {
    const fetchParticipants = async () => {
      const response = await axiosSecure.get(
        "https://medicamp-server-jade.vercel.app/registered-participant"
      );
      setRegisteredParticipants(response.data);
    };

    fetchParticipants();
  }, []);

  const openModal = () => {
    setModalVisible(true);
    // Prefill form with user data + camp details
    reset({
      participantName: currentUser.name,
      participantEmail: currentUser.email,
      age: "",
      phone: "",
      gender: "",
      emergencyContact: "",
      campName: camp?.campName,
      campFees: camp?.campFees,
      location: camp?.location,
      healthcareProfessional: camp?.healthcareProfessional,
    });
  };

  const onRegisterSubmit = async (data) => {
    setRegistering(true);

    // 🔍 Check if already registered
    const isAlreadyRegistered = registeredParticipants.some(
      (participant) =>
        participant.participantEmail === data.participantEmail &&
        participant.participantName.trim().toLowerCase() ===
          data.participantName.trim().toLowerCase() &&
        participant.phone === data.phone
    );

    console.log("already registered?: ", isAlreadyRegistered);

    if (isAlreadyRegistered) {
      toast.error("❌ You are already registered for this camp!");
      // setAlreadyRegistered(true)
      setRegistering(false);
      return;
    }

    try {
      // ✅ Continue with registration
      const registrationData = {
        campId: id,
        participantName: data.participantName,
        participantEmail: data.participantEmail,
        loggedUserEmail: currentUser.email,
        age: data.age,
        phone: data.phone,
        gender: data.gender,
        emergencyContact: data.emergencyContact,
        paymentStatus: "unpaid",
        confirmationStatus: "pending",
        transactionId: null,
        registeredAt: new Date().toISOString(),

        // Camp snapshot
        campName: camp.campName,
        image: camp.image,
        campFees: camp.campFees,
        dateTime: camp.dateTime,
        location: camp.location,
        healthcareProfessional: camp.healthcareProfessional,
        description: camp.description,
        participantCount: camp.participantCount,
        addedBy: camp.addedBy,
      };

      await axios.post(
        "https://medicamp-server-jade.vercel.app/registered-participant",
        registrationData
      );

      await axios.patch(
        `https://medicamp-server-jade.vercel.app/camps/${id}/increment-participants`
      );

      toast.success("🎉 Successfully joined the camp!");
      navigate("/dashboard/participants/camps");
      setModalVisible(false);

      // Optional UI update
      setCamp((prev) => ({
        ...prev,
        participantCount: (prev?.participantCount || 0) + 1,
      }));
    } catch (error) {
      toast.error("Failed to join camp. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading || isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (fetchError)
    return (
      <div className="text-center text-red-600 text-lg mt-20">
        {fetchError}
        <div className="mt-4">
          <Button onClick={() => navigate(-1)} icon={<ArrowLeftOutlined />}>
            Back
          </Button>
        </div>
      </div>
    );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      className="max-w-4xl mx-auto mt-10 px-4"
    >
      <Helmet>
        <title>Camp Details | MCMS</title>
      </Helmet>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/available-camps")}
        type="link"
        className="mb-6 mt-14 text-black z-50"
      >
        Back to Camps
      </Button>

      <Card
        hoverable
        cover={
          <img
            src={camp.image}
            alt={camp.campName}
            className="w-full max-h-80 object-cover rounded-lg"
          />
        }
        className="shadow-lg rounded-lg"
      >
        <h1 className="text-4xl font-extrabold mb-4 text-indigo-700">
          {camp.campName}
        </h1>

        <div className="text-lg mb-2">
          <strong>Fees: </strong>
          {camp.campFees === 0 ? (
            <span className="text-green-600 font-semibold">Free</span>
          ) : (
            <span>BDT {camp.campFees}</span>
          )}
        </div>

        <div className="text-lg mb-2">
          <strong>Date & Time: </strong>
          {dayjs(camp.dateTime).format("MMMM D, YYYY – h:mm A")}
        </div>

        <div className="text-lg mb-2">
          <strong>Location: </strong>
          {camp.location}
        </div>

        <div className="text-lg mb-2">
          <strong>Healthcare Professional: </strong>
          {camp.healthcareProfessional}
        </div>

        <div className="text-lg mb-6">
          <strong>Participants: </strong>
          {camp.participantCount || 0}
        </div>

        <div className="mb-6 text-gray-700 whitespace-pre-line">
          <strong>Description:</strong>
          <p className="mt-2">{camp.description}</p>
        </div>

        {alreadyRegistered ? (
          <div className="text-green-700 font-semibold mb-4">
            You have already registered for this camp.
          </div>
        ) : (
          <Button
            type="primary"
            size="large"
            icon={<UserAddOutlined />}
            onClick={openModal}
          >
            Join Camp
          </Button>
        )}
      </Card>

      {/* Registration Modal */}
      <Modal
        title={`Join Camp: ${camp?.campName}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleSubmit(onRegisterSubmit)}>
          {/* Read-only Camp Info */}
          <Form.Item label="Camp Name">
            <Input value={camp?.campName} readOnly />
          </Form.Item>
          <Form.Item label="Camp Fees">
            <Input
              value={camp?.campFees === 0 ? "Free" : `BDT ${camp?.campFees}`}
              readOnly
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input value={camp?.location} readOnly />
          </Form.Item>
          <Form.Item label="Healthcare Professional">
            <Input value={camp?.healthcareProfessional} readOnly />
          </Form.Item>

          {/* Participant Inputs */}
          <Form.Item
            label="Participant Name"
            validateStatus={errors.participantName ? "error" : ""}
            help={errors.participantName && "Name is required"}
          >
            <Controller
              name="participantName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Your full name" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Participant Email"
            validateStatus={errors.participantEmail ? "error" : ""}
            help={errors.participantEmail && "Email is required"}
          >
            <Controller
              name="participantEmail"
              control={control}
              rules={{
                required: true,
                pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <Input {...field} placeholder="Your email address" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Age"
            validateStatus={errors.age ? "error" : ""}
            help={errors.age && "Age is required"}
          >
            <Controller
              name="age"
              control={control}
              rules={{ required: true, min: 1 }}
              render={({ field }) => (
                <InputNumber {...field} min={1} className="w-full" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone && "Phone number is required"}
          >
            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Phone number" />
              )}
            />
          </Form.Item>

          <Form.Item
            label="Gender"
            validateStatus={errors.gender ? "error" : ""}
            help={errors.gender && "Please select gender"}
          >
            <Controller
              name="gender"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select placeholder="Select gender" {...field} allowClear>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Other">Other</Option>
                </Select>
              )}
            />
          </Form.Item>

          <Form.Item
            label="Emergency Contact"
            validateStatus={errors.emergencyContact ? "error" : ""}
            help={errors.emergencyContact && "Emergency contact required"}
          >
            <Controller
              name="emergencyContact"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input {...field} placeholder="Emergency contact number" />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={registering}
              size="large"
            >
              Submit Registration
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </motion.div>
  );
};

export default CampDetails;
