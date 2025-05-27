import React, { useState } from 'react';
import { Create } from '../methods/requests';


const Send = async (setData, setLoading, body) => {
	await Create('users/sendMessage', setData, setLoading, body)
}

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: '',
		from: '',
		subject: '',
		message: ''
	});

	const [data, setData] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await Send(setData, setLoading, formData)
		// 🔧 Replace with your email handler (EmailJS, backend, etc.)
		// console.log('Form submitted:', formData);
		alert("Message sent!");
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<section className="form-section">
				<p className="form-text">Name:</p>
				<input className="form-input" type="text" name="name" placeholder="Your Name" required onChange={handleChange} value={formData.name} />
			</section>
			<section className="form-section">
				<p className="form-text">Email:</p>
				<input className="form-input" type="email" name="from" placeholder="Your Email" required onChange={handleChange} value={formData.from} />
			</section>
			<section className="form-section">
				<p className="form-text">Subject</p>
				<input className="form-input" type="text" name="subject" placeholder="Subject" required onChange={handleChange} value={formData.subject} />
			</section>
			<section className="form-section">
				<p className="form-text form-message">Message:</p>
				<textarea className="form-input" name="message" placeholder="Your Message" required onChange={handleChange} value={formData.message} rows="5" />
			</section>
			<section className="form-section form-button">
				<button className="form-input" type="submit">Submit</button>
			</section>
		</form>
	);
}
