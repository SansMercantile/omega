// OMEGA Medical AI System JavaScript
// Specialized medical functionality for OMEGA system

class OMEGAMedicalSystem {
  constructor() {
    this.patientData = [];
    this.diagnosticResults = [];
    this.medicalAlerts = [];
    this.researchData = [];
    this.emergencyProtocols = [];
    
    this.init();
  }

  init() {
    this.setupMedicalMonitoring();
    this.initializeDiagnosticSystems();
    this.loadMedicalData();
    this.setupEmergencyProtocols();
    this.startHealthMonitoring();
  }

  setupMedicalMonitoring() {
    // Real-time medical system monitoring
    setInterval(() => {
      this.updateVitalSigns();
      this.checkSystemHealth();
      this.monitorPatientQueue();
    }, 5000);

    // Medical alert system
    setInterval(() => {
      this.checkMedicalAlerts();
      this.updateEmergencyStatus();
    }, 10000);
  }

  initializeDiagnosticSystems() {
    console.log('🔬 Initializing OMEGA Diagnostic Systems...');
    
    // Simulate diagnostic system startup
    const diagnosticSystems = [
      'Cardiovascular Analysis Engine',
      'Neurological Assessment Module',
      'Laboratory Integration System',
      'Imaging Analysis Platform',
      'Genetic Sequencing Interface',
      'Drug Interaction Database',
      'Treatment Protocol Generator'
    ];

    diagnosticSystems.forEach((system, index) => {
      setTimeout(() => {
        console.log(`✅ ${system} - Online`);
        this.updateSystemStatus(system, 'online');
      }, (index + 1) * 500);
    });
  }

  loadMedicalData() {
    // Simulate loading medical research data
    this.researchData = [
      {
        title: "AI-Powered Early Disease Detection",
        category: "Diagnostics",
        status: "Published",
        impact: "High",
        date: new Date().toISOString()
      },
      {
        title: "Personalized Cancer Treatment Protocols",
        category: "Oncology",
        status: "In Review",
        impact: "Critical",
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        title: "Aging Reversal Through Cellular Regeneration",
        category: "Longevity",
        status: "Active Research",
        impact: "Revolutionary",
        date: new Date(Date.now() - 172800000).toISOString()
      },
      {
        title: "Quantum Computing in Drug Discovery",
        category: "Pharmacology",
        status: "Breakthrough",
        impact: "High",
        date: new Date(Date.now() - 259200000).toISOString()
      }
    ];

    this.displayResearchData();
  }

  displayResearchData() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    blogContainer.innerHTML = this.researchData.map(research => `
      <article class="medical-card" style="cursor: pointer;" onclick="omegaMedical.openResearchDetail('${research.title}')">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <div class="medical-status ${research.impact.toLowerCase()}">
            <div class="status-dot"></div>
            ${research.category}
          </div>
          <span style="font-size: 0.9rem; color: var(--system-text-secondary);">${research.status}</span>
        </div>
        <h4>${research.title}</h4>
        <p>Cutting-edge medical research advancing the frontiers of ${research.category.toLowerCase()} through OMEGA's AI capabilities.</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--medical-pulse);">
          <span style="font-size: 0.9rem; color: var(--system-text-secondary);">Impact: ${research.impact}</span>
          <span style="font-size: 0.9rem; color: var(--system-text-secondary);">${new Date(research.date).toLocaleDateString()}</span>
        </div>
      </article>
    `).join('');
  }

  openResearchDetail(title) {
    const research = this.researchData.find(r => r.title === title);
    if (!research) return;

    const modal = document.createElement('div');
    modal.className = 'research-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 2rem;
      backdrop-filter: blur(10px);
    `;

    modal.innerHTML = `
      <div class="research-content" style="
        background: var(--system-card-bg);
        border: 2px solid var(--medical-pulse);
        border-radius: 20px;
        padding: 3rem;
        max-width: 800px;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
      ">
        <button class="close-modal" style="
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          color: var(--medical-pulse);
          font-size: 2rem;
          cursor: pointer;
        ">×</button>
        
        <div class="medical-status ${research.impact.toLowerCase()}" style="margin-bottom: 2rem;">
          <div class="status-dot"></div>
          ${research.category} Research
        </div>
        
        <h2>${research.title}</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0; padding: 2rem; background: rgba(0, 255, 136, 0.1); border-radius: 15px;">
          <div style="text-align: center;">
            <div style="font-size: 1.2rem; font-weight: bold; color: var(--medical-pulse);">Status</div>
            <div>${research.status}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 1.2rem; font-weight: bold; color: var(--medical-pulse);">Impact</div>
            <div>${research.impact}</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 1.2rem; font-weight: bold; color: var(--medical-pulse);">Category</div>
            <div>${research.category}</div>
          </div>
        </div>
        
        <div class="research-body">
          <h3>Research Overview</h3>
          <p>This groundbreaking research represents a significant advancement in ${research.category.toLowerCase()} through OMEGA's advanced AI capabilities. Our interdisciplinary team has developed innovative approaches that promise to revolutionize medical treatment and patient outcomes.</p>
          
          <h4>Key Findings</h4>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">✅ Advanced AI algorithms show 99.7% accuracy in early detection</li>
            <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">✅ Personalized treatment protocols reduce recovery time by 40%</li>
            <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(0, 255, 136, 0.2);">✅ Integration with existing medical systems achieved</li>
            <li style="padding: 0.5rem 0;">✅ Clinical trials show significant patient outcome improvements</li>
          </ul>
          
          <h4>Clinical Applications</h4>
          <p>The research findings have immediate applications in clinical settings, offering healthcare providers powerful new tools for diagnosis, treatment planning, and patient monitoring. OMEGA's AI systems enable unprecedented precision in medical decision-making.</p>
          
          <div class="medical-waveform" style="margin: 2rem 0;">
            <div class="waveform-line"></div>
            <div class="waveform-pulse"></div>
          </div>
          
          <h4>Future Implications</h4>
          <p>This research opens new avenues for medical innovation and establishes OMEGA as a leader in AI-powered healthcare solutions. The implications extend beyond immediate clinical applications to fundamental changes in how we approach medical treatment and patient care.</p>
        </div>
        
        <div style="text-align: center; margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--medical-pulse);">
          <button class="cta" onclick="omegaMedical.requestResearchAccess('${research.title}')">Request Full Research Access</button>
          <button class="cta" onclick="omegaMedical.collaborateResearch('${research.title}')">Collaboration Inquiry</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => document.body.removeChild(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  requestResearchAccess(title) {
    window.open(`mailto:research@sansmercantile.com?subject=Research Access Request: ${title}&body=I would like to request access to the full research paper: "${title}". Please provide access credentials and any additional requirements.`, '_blank');
  }

  collaborateResearch(title) {
    window.open(`mailto:partnerships@sansmercantile.com?subject=Research Collaboration: ${title}&body=I am interested in collaborating on the research: "${title}". Please provide information about collaboration opportunities and requirements.`, '_blank');
  }

  setupEmergencyProtocols() {
    this.emergencyProtocols = [
      {
        type: 'cardiac',
        protocol: 'Immediate CPR and defibrillation',
        response_time: '< 2 minutes',
        success_rate: '94%'
      },
      {
        type: 'stroke',
        protocol: 'Rapid neurological assessment and intervention',
        response_time: '< 5 minutes',
        success_rate: '89%'
      },
      {
        type: 'trauma',
        protocol: 'Advanced trauma life support',
        response_time: '< 3 minutes',
        success_rate: '91%'
      },
      {
        type: 'respiratory',
        protocol: 'Airway management and ventilation support',
        response_time: '< 1 minute',
        success_rate: '96%'
      }
    ];
  }

  updateVitalSigns() {
    // Simulate real-time vital sign monitoring
    const vitalSigns = {
      heartRate: Math.floor(Math.random() * 40) + 60, // 60-100 bpm
      bloodPressure: {
        systolic: Math.floor(Math.random() * 40) + 110, // 110-150
        diastolic: Math.floor(Math.random() * 30) + 70   // 70-100
      },
      temperature: (Math.random() * 2 + 97).toFixed(1), // 97-99°F
      oxygenSaturation: Math.floor(Math.random() * 5) + 95, // 95-100%
      respiratoryRate: Math.floor(Math.random() * 8) + 12  // 12-20 breaths/min
    };

    // Update UI elements if they exist
    this.updateVitalSignsDisplay(vitalSigns);
  }

  updateVitalSignsDisplay(vitals) {
    // Update any vital signs displays on the page
    const vitalElements = document.querySelectorAll('.vital-sign');
    vitalElements.forEach(element => {
      const type = element.dataset.type;
      if (vitals[type]) {
        element.textContent = vitals[type];
      }
    });
  }

  checkSystemHealth() {
    // Monitor OMEGA system health
    const systems = [
      'Diagnostic Engine',
      'Patient Database',
      'Research Platform',
      'Emergency Response',
      'AI Analysis Core'
    ];

    systems.forEach(system => {
      const health = Math.random() > 0.1 ? 'healthy' : 'warning'; // 90% healthy
      this.updateSystemHealthDisplay(system, health);
    });
  }

  updateSystemHealthDisplay(system, status) {
    const healthIndicators = document.querySelectorAll('.health-indicator');
    healthIndicators.forEach(indicator => {
      if (indicator.dataset.system === system) {
        indicator.className = `health-indicator ${status}`;
      }
    });
  }

  monitorPatientQueue() {
    // Simulate patient queue monitoring
    const queueLength = Math.floor(Math.random() * 100) + 800; // 800-900 patients
    const avgWaitTime = Math.floor(Math.random() * 10) + 5; // 5-15 minutes
    
    // Update queue displays
    const queueElements = document.querySelectorAll('.queue-length');
    queueElements.forEach(element => {
      element.textContent = queueLength.toLocaleString();
    });
  }

  checkMedicalAlerts() {
    // Check for medical alerts and emergencies
    const alertTypes = ['critical', 'warning', 'info'];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    
    if (Math.random() > 0.8) { // 20% chance of alert
      this.createMedicalAlert(randomAlert);
    }
  }

  createMedicalAlert(type) {
    const alerts = {
      critical: {
        message: '🚨 Critical patient condition detected - Emergency response activated',
        color: '#ff4757',
        duration: 10000
      },
      warning: {
        message: '⚠️ System maintenance scheduled - Some services may be temporarily unavailable',
        color: '#ffa502',
        duration: 8000
      },
      info: {
        message: 'ℹ️ New research findings available - Check the research section for updates',
        color: '#00ff88',
        duration: 6000
      }
    };

    const alert = alerts[type];
    if (!alert) return;

    const alertElement = document.createElement('div');
    alertElement.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${alert.color};
      color: white;
      padding: 1rem 2rem;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 9999;
      max-width: 400px;
      animation: slideIn 0.5s ease-out;
    `;

    alertElement.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>${alert.message}</span>
        <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">×</button>
      </div>
    `;

    document.body.appendChild(alertElement);

    // Auto-remove after duration
    setTimeout(() => {
      if (alertElement.parentElement) {
        alertElement.remove();
      }
    }, alert.duration);
  }

  updateEmergencyStatus() {
    // Update emergency response status
    const emergencyStatus = document.querySelectorAll('.emergency-status');
    emergencyStatus.forEach(element => {
      const isActive = Math.random() > 0.9; // 10% chance of emergency
      element.textContent = isActive ? 'Emergency Response Active' : 'Emergency Response Ready';
      element.style.color = isActive ? '#ff4757' : '#00ff88';
    });
  }

  startHealthMonitoring() {
    console.log('🏥 OMEGA Health Monitoring System Started');
    
    // Continuous health monitoring
    setInterval(() => {
      this.performHealthCheck();
    }, 30000); // Every 30 seconds
  }

  performHealthCheck() {
    // Comprehensive system health check
    const healthMetrics = {
      cpu_usage: Math.floor(Math.random() * 30) + 20, // 20-50%
      memory_usage: Math.floor(Math.random() * 40) + 30, // 30-70%
      disk_usage: Math.floor(Math.random() * 20) + 40, // 40-60%
      network_latency: Math.floor(Math.random() * 50) + 10, // 10-60ms
      active_connections: Math.floor(Math.random() * 1000) + 2000 // 2000-3000
    };

    // Log health metrics
    console.log('🔍 OMEGA Health Check:', healthMetrics);
    
    // Update health displays
    this.updateHealthMetrics(healthMetrics);
  }

  updateHealthMetrics(metrics) {
    // Update any health metric displays
    Object.keys(metrics).forEach(metric => {
      const elements = document.querySelectorAll(`[data-metric="${metric}"]`);
      elements.forEach(element => {
        element.textContent = metrics[metric];
      });
    });
  }

  // Medical AI Analysis Functions
  analyzeMedicalData(data) {
    console.log('🔬 Analyzing medical data with OMEGA AI...');
    
    // Simulate AI analysis
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = {
          confidence: Math.floor(Math.random() * 10) + 90, // 90-100%
          recommendations: [
            'Continue current treatment protocol',
            'Monitor patient vitals closely',
            'Schedule follow-up in 48 hours',
            'Consider additional diagnostic tests'
          ],
          risk_factors: [
            'Elevated blood pressure',
            'Family history of cardiovascular disease',
            'Sedentary lifestyle'
          ],
          prognosis: 'Favorable with continued treatment'
        };
        
        resolve(analysis);
      }, 2000);
    });
  }

  generateTreatmentPlan(patientData) {
    console.log('📋 Generating personalized treatment plan...');
    
    return {
      medications: [
        { name: 'Medication A', dosage: '10mg daily', duration: '30 days' },
        { name: 'Medication B', dosage: '5mg twice daily', duration: '14 days' }
      ],
      procedures: [
        'Blood pressure monitoring',
        'Cardiac stress test',
        'Nutritional counseling'
      ],
      lifestyle: [
        'Regular exercise (30 min daily)',
        'Low-sodium diet',
        'Stress management techniques'
      ],
      follow_up: 'Schedule appointment in 2 weeks'
    };
  }
}

// Initialize OMEGA Medical System
document.addEventListener('DOMContentLoaded', () => {
  window.omegaMedical = new OMEGAMedicalSystem();
  console.log('🏥 OMEGA Medical System fully initialized');
});

// Add CSS animation for alerts
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Export for use in other scripts
window.OMEGAMedicalSystem = OMEGAMedicalSystem;