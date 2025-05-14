// Global data
let resumeData = {
  contactInfo: [],
  educationData: [],
  skillsData: [],
  languagesData: [],
  experienceData: [],
  profileText: '',
  referenceText: ''
};

// Load data from localStorage or JSON
async function loadData() {
  // Try localStorage first
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    try {
      resumeData = JSON.parse(savedData);
      return; // Exit if we got data from localStorage
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
    }
  }

  // Fall back to JSON file
  try {
    const response = await fetch('data.json');
    if (!response.ok) throw new Error('Failed to load data');
    const jsonData = await response.json();
    resumeData = jsonData;
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  } catch (error) {
    console.error('Error loading data:', error);
    resumeData = {
      contactInfo: [],
      educationData: [],
      skillsData: [],
      languagesData: [],
      experienceData: [],
      profileText: '',
      referenceText: ''
    };
  }
}

// Save data to localStorage
function saveData() {
  try {
    // Update all fields before saving
    resumeData.profileText = document.getElementById('profile-text').textContent;
    resumeData.referenceText = document.getElementById('reference-text').textContent;
    
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
    showToast('Data saved successfully!');
  } catch (e) {
    console.error("Error saving data:", e);
    showToast('Error saving data!');
  }
}

// Reset to original JSON data
async function resetToOriginal() {
  if (confirm("Are you sure you want to reset all changes?")) {
    try {
      const response = await fetch('data.json');
      if (!response.ok) throw new Error('Failed to load data');
      resumeData = await response.json();
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      renderAll();
      showToast('Data reset successfully!');
    } catch (error) {
      console.error('Error resetting data:', error);
      showToast('Error resetting data!');
    }
  }
}

// Show notification
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 2000);
}

// ========== RENDER FUNCTIONS ========== //

function renderContactInfo() {
  const container = document.getElementById('contact-section');
  container.innerHTML = '';
  
  resumeData.contactInfo.forEach((info, index) => {
    const entry = document.createElement('div');
    entry.className = 'contact-entry';
    
    const span = document.createElement('span');
    span.textContent = info;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = () => editContact(index, span);
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    saveBtn.dataset.index = index;
    saveBtn.dataset.type = 'contact';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove-btn';
    removeBtn.dataset.index = index;
    
    entry.appendChild(span);
    entry.appendChild(editBtn);
    entry.appendChild(saveBtn);
    entry.appendChild(removeBtn);
    container.appendChild(entry);
  });
}

function renderEducation() {
  const container = document.querySelector('.education-container');
  container.innerHTML = '';
  
  resumeData.educationData.forEach((edu, index) => {
    const entry = document.createElement('div');
    entry.className = 'education-entry';
    
    const degreeDiv = document.createElement('div');
    degreeDiv.innerHTML = `<strong>Degree:</strong> <span>${edu.degree || ''}</span>`;
    
    const schoolDiv = document.createElement('div');
    schoolDiv.innerHTML = `<strong>Institution:</strong> <span>${edu.school || ''}</span>`;
    
    const yearDiv = document.createElement('div');
    yearDiv.innerHTML = `<strong>Year:</strong> <span>${edu.year || ''}</span>`;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = () => editEducation(index, entry);
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    saveBtn.dataset.index = index;
    saveBtn.dataset.type = 'education';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove-btn';
    removeBtn.dataset.index = index;
    
    entry.appendChild(degreeDiv);
    entry.appendChild(schoolDiv);
    entry.appendChild(yearDiv);
    entry.appendChild(editBtn);
    entry.appendChild(saveBtn);
    entry.appendChild(removeBtn);
    container.appendChild(entry);
  });
}

function renderSkills() {
  const container = document.querySelector('.skills-container');
  container.innerHTML = '';
  
  resumeData.skillsData.forEach((skill, index) => {
    const entry = document.createElement('div');
    entry.className = 'skill-entry';
    
    const span = document.createElement('span');
    span.textContent = skill;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = () => editSkill(index, span);
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    saveBtn.dataset.index = index;
    saveBtn.dataset.type = 'skill';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove-btn';
    removeBtn.dataset.index = index;
    
    entry.appendChild(span);
    entry.appendChild(editBtn);
    entry.appendChild(saveBtn);
    entry.appendChild(removeBtn);
    container.appendChild(entry);
  });
}

function renderLanguages() {
  const container = document.querySelector('.languages-container');
  container.innerHTML = '';
  
  resumeData.languagesData.forEach((lang, index) => {
    const entry = document.createElement('div');
    entry.className = 'language-entry';
    
    const span = document.createElement('span');
    span.textContent = lang;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = () => editLanguage(index, span);
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    saveBtn.dataset.index = index;
    saveBtn.dataset.type = 'language';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove-btn';
    removeBtn.dataset.index = index;
    
    entry.appendChild(span);
    entry.appendChild(editBtn);
    entry.appendChild(saveBtn);
    entry.appendChild(removeBtn);
    container.appendChild(entry);
  });
}

function renderExperience() {
  const container = document.querySelector('.experience-container');
  container.innerHTML = '';
  
  resumeData.experienceData.forEach((exp, index) => {
    const entry = document.createElement('div');
    entry.className = 'experience-entry';
    
    const jobTitleDiv = document.createElement('div');
    jobTitleDiv.innerHTML = `<strong>Position:</strong> <span>${exp.jobTitle || ''}</span>`;
    
    const companyDiv = document.createElement('div');
    companyDiv.innerHTML = `<strong>Company:</strong> <span>${exp.company || ''}</span>`;
    
    const durationDiv = document.createElement('div');
    durationDiv.innerHTML = `<strong>Duration:</strong> <span>${exp.duration || ''}</span>`;
    
    const descDiv = document.createElement('div');
    descDiv.innerHTML = `<strong>Description:</strong> <span>${exp.description || ''}</span>`;
    
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-field-btn';
    editBtn.onclick = () => editExperience(index, entry);
    
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';
    saveBtn.dataset.index = index;
    saveBtn.dataset.type = 'experience';
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '×';
    removeBtn.className = 'remove-btn';
    removeBtn.dataset.index = index;
    
    entry.appendChild(jobTitleDiv);
    entry.appendChild(companyDiv);
    entry.appendChild(durationDiv);
    entry.appendChild(descDiv);
    entry.appendChild(editBtn);
    entry.appendChild(saveBtn);
    entry.appendChild(removeBtn);
    container.appendChild(entry);
  });
}

function renderProfile() {
  const el = document.getElementById('profile-text');
  el.textContent = resumeData.profileText || 'Enter your profile information here';
}

function renderReference() {
  const el = document.getElementById('reference-text');
  el.textContent = resumeData.referenceText || 'Reference information';
}

function renderAll() {
  renderContactInfo();
  renderEducation();
  renderSkills();
  renderLanguages();
  renderExperience();
  renderProfile();
  renderReference();
}

// ========== EDIT FUNCTIONS ========== //

function editContact(index, element) {
  const container = element.parentElement;
  const oldValue = resumeData.contactInfo[index];
  
  const inputContainer = createInputField(oldValue, (value) => {
    if (value && /^\d+$/.test(value)) {
      resumeData.contactInfo[index] = value;
      renderContactInfo();
      saveData();
    } else {
      alert('Please enter only numbers for contact info');
    }
  }, () => renderContactInfo());
  
  container.innerHTML = '';
  container.appendChild(inputContainer);
}

function editEducation(index, element) {
  const edu = resumeData.educationData[index];
  const container = element;
  
  const degreeInput = createInputField(edu.degree, (value) => {
    edu.degree = value;
    renderEducation();
    saveData();
  }, () => renderEducation());
  
  const schoolInput = createInputField(edu.school, (value) => {
    edu.school = value;
    renderEducation();
    saveData();
  }, () => renderEducation());
  
  const yearInput = createInputField(edu.year, (value) => {
    edu.year = value;
    renderEducation();
    saveData();
  }, () => renderEducation());
  
  container.innerHTML = '';
  
  const degreeDiv = document.createElement('div');
  degreeDiv.innerHTML = '<strong>Degree:</strong> ';
  degreeDiv.appendChild(degreeInput);
  
  const schoolDiv = document.createElement('div');
  schoolDiv.innerHTML = '<strong>Institution:</strong> ';
  schoolDiv.appendChild(schoolInput);
  
  const yearDiv = document.createElement('div');
  yearDiv.innerHTML = '<strong>Year:</strong> ';
  yearDiv.appendChild(yearInput);
  
  container.appendChild(degreeDiv);
  container.appendChild(schoolDiv);
  container.appendChild(yearDiv);
}

function editSkill(index, element) {
  const container = element.parentElement;
  const oldValue = resumeData.skillsData[index];
  
  const inputContainer = createInputField(oldValue, (value) => {
    if (value) {
      resumeData.skillsData[index] = value;
      renderSkills();
      saveData();
    }
  }, () => renderSkills());
  
  container.innerHTML = '';
  container.appendChild(inputContainer);
}

function editLanguage(index, element) {
  const container = element.parentElement;
  const oldValue = resumeData.languagesData[index];
  
  const inputContainer = createInputField(oldValue, (value) => {
    if (value) {
      resumeData.languagesData[index] = value;
      renderLanguages();
      saveData();
    }
  }, () => renderLanguages());
  
  container.innerHTML = '';
  container.appendChild(inputContainer);
}

function editExperience(index, element) {
  const exp = resumeData.experienceData[index];
  const container = element;
  
  const jobTitleInput = createInputField(exp.jobTitle, (value) => {
    exp.jobTitle = value;
    renderExperience();
    saveData();
  }, () => renderExperience());
  
  const companyInput = createInputField(exp.company, (value) => {
    exp.company = value;
    renderExperience();
    saveData();
  }, () => renderExperience());
  
  const durationInput = createInputField(exp.duration, (value) => {
    exp.duration = value;
    renderExperience();
    saveData();
  }, () => renderExperience());
  
  const descInput = createInputField(exp.description, (value) => {
    exp.description = value;
    renderExperience();
    saveData();
  }, () => renderExperience());
  
  container.innerHTML = '';
  
  const jobTitleDiv = document.createElement('div');
  jobTitleDiv.innerHTML = '<strong>Position:</strong> ';
  jobTitleDiv.appendChild(jobTitleInput);
  
  const companyDiv = document.createElement('div');
  companyDiv.innerHTML = '<strong>Company:</strong> ';
  companyDiv.appendChild(companyInput);
  
  const durationDiv = document.createElement('div');
  durationDiv.innerHTML = '<strong>Duration:</strong> ';
  durationDiv.appendChild(durationInput);
  
  const descDiv = document.createElement('div');
  descDiv.innerHTML = '<strong>Description:</strong> ';
  descDiv.appendChild(descInput);
  
  container.appendChild(jobTitleDiv);
  container.appendChild(companyDiv);
  container.appendChild(durationDiv);
  container.appendChild(descDiv);
}

function createInputField(value, onSave, onCancel) {
  const container = document.createElement('div');
  container.className = 'edit-container';
  
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.className = 'edit-input';
  
  const saveBtn = document.createElement('button');
  saveBtn.textContent = '✓';
  saveBtn.className = 'edit-btn save-btn';
  saveBtn.onclick = () => onSave(input.value);
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '✗';
  cancelBtn.className = 'edit-btn cancel-btn';
  cancelBtn.onclick = onCancel;
  
  container.appendChild(input);
  container.appendChild(saveBtn);
  container.appendChild(cancelBtn);
  
  return container;
}

// ========== ADD FUNCTIONS ========== //

function addContact() {
  const input = document.getElementById('new-contact');
  const text = input.value.trim();
  
  if (!text) return alert("Contact info cannot be empty");
  if (!/^\d+$/.test(text)) return alert("Please enter only numbers for contact info");
  
  resumeData.contactInfo.push(text);
  renderContactInfo();
  input.value = '';
  saveData();
}

function addEducation() {
  resumeData.educationData.push({
    degree: '',
    school: '',
    year: ''
  });
  renderEducation();
  saveData();
}

function addSkill() {
  const input = document.getElementById('new-skill');
  const text = input.value.trim();
  
  if (!text) return alert("Skill cannot be empty");
  
  resumeData.skillsData.push(text);
  renderSkills();
  input.value = '';
  saveData();
}

function addLanguage() {
  const input = document.getElementById('new-language');
  const text = input.value.trim();
  
  if (!text) return alert("Language cannot be empty");
  
  resumeData.languagesData.push(text);
  renderLanguages();
  input.value = '';
  saveData();
}

function addExperience() {
  resumeData.experienceData.push({
    jobTitle: '',
    company: '',
    duration: '',
    description: ''
  });
  renderExperience();
  saveData();
}

// ========== INITIALIZATION ========== //

function toggleDropdown(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
  const heading = document.getElementById(id.replace('-dropdown', '-heading'));
  heading.innerHTML = heading.innerHTML.replace(/[▲▼]/, section.style.display === 'none' ? '▼' : '▲');
}

function initializeEventListeners() {
  // Save All button
  document.getElementById('save-all').addEventListener('click', saveData);

  // Add buttons
  document.getElementById('add-contact').addEventListener('click', addContact);
  document.getElementById('add-education').addEventListener('click', addEducation);
  document.getElementById('add-skill').addEventListener('click', addSkill);
  document.getElementById('add-language').addEventListener('click', addLanguage);
  document.getElementById('add-experience').addEventListener('click', addExperience);

  // Dropdown toggles
  document.getElementById('contact-heading').addEventListener('click', () => toggleDropdown('contact-dropdown'));
  document.getElementById('education-heading').addEventListener('click', () => toggleDropdown('education-dropdown'));
  document.getElementById('skills-heading').addEventListener('click', () => toggleDropdown('skills-dropdown'));
  document.getElementById('languages-heading').addEventListener('click', () => toggleDropdown('languages-dropdown'));

  // Profile and Reference text saving
  document.getElementById('profile-text').addEventListener('input', function() {
    resumeData.profileText = this.textContent;
    saveData();
  });

  document.getElementById('reference-text').addEventListener('input', function() {
    resumeData.referenceText = this.textContent;
    saveData();
  });

  // Event delegation for dynamic elements
  document.addEventListener('click', function(e) {
    // Handle save buttons
    if (e.target.classList.contains('save-btn')) {
      const index = e.target.dataset.index;
      const type = e.target.dataset.type;
      
      switch(type) {
        case 'contact':
          resumeData.contactInfo[index] = e.target.parentElement.querySelector('span').textContent;
          break;
        case 'education':
          const eduFields = e.target.parentElement.querySelectorAll('span');
          resumeData.educationData[index] = {
            degree: eduFields[0].textContent,
            school: eduFields[1].textContent,
            year: eduFields[2].textContent
          };
          break;
        case 'skill':
          resumeData.skillsData[index] = e.target.parentElement.querySelector('span').textContent;
          break;
        case 'language':
          resumeData.languagesData[index] = e.target.parentElement.querySelector('span').textContent;
          break;
        case 'experience':
          const expFields = e.target.parentElement.querySelectorAll('span');
          resumeData.experienceData[index] = {
            jobTitle: expFields[0].textContent,
            company: expFields[1].textContent,
            duration: expFields[2].textContent,
            description: expFields[3].textContent
          };
          break;
      }
      
      e.target.textContent = 'Saved!';
      setTimeout(() => {
        e.target.textContent = 'Save';
      }, 2000);
      saveData();
    }
    
    // Handle remove buttons
    if (e.target.classList.contains('remove-btn')) {
      const index = e.target.dataset.index;
      const type = e.target.parentElement.querySelector('.save-btn').dataset.type;
      
      switch(type) {
        case 'contact':
          resumeData.contactInfo.splice(index, 1);
          break;
        case 'education':
          resumeData.educationData.splice(index, 1);
          break;
        case 'skill':
          resumeData.skillsData.splice(index, 1);
          break;
        case 'language':
          resumeData.languagesData.splice(index, 1);
          break;
        case 'experience':
          resumeData.experienceData.splice(index, 1);
          break;
      }
      
      renderAll();
      saveData();
    }
  });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  renderAll();
  initializeEventListeners();
  
  // Add Reset button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset All';
  resetBtn.className = 'reset-btn';
  resetBtn.onclick = resetToOriginal;
  document.body.appendChild(resetBtn);
  
  // Initialize dropdowns as open
  document.getElementById('contact-dropdown').style.display = 'block';
  document.getElementById('education-dropdown').style.display = 'block';
  document.getElementById('skills-dropdown').style.display = 'block';
  document.getElementById('languages-dropdown').style.display = 'block';
});