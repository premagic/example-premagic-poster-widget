import React from 'react';

/**
 * REGISTRATION FORM COMPONENT
 * 
 * Reusable registration form component that can be used in any page.
 * 
 * @param {Object} formData - Form data state
 * @param {Function} handleInputChange - Handler for input changes
 * @param {Function} handleSubmit - Handler for form submission
 * @param {Function} onCancel - Handler for cancel button
 */
const RegistrationForm = ({ formData, handleInputChange, handleSubmit, onCancel }) => {
  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="emailId">Email Address *</label>
          <input
            type="email"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailIdConfirmation">Confirm Email Address *</label>
          <input
            type="email"
            id="emailIdConfirmation"
            name="emailIdConfirmation"
            value={formData.emailIdConfirmation}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title / Role</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="linkedinProfile">LinkedIn Profile URL</label>
        <input
          type="url"
          id="linkedinProfile"
          name="linkedinProfile"
          value={formData.linkedinProfile}
          onChange={handleInputChange}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>
      <div className="form-actions">
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-primary">
          Next
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;

