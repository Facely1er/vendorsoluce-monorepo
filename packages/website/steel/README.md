# STEEL™ Assessment Platform

**Strategic Threat & Enterprise Evaluation Layer**

*"Global Insights, Streamlined for Resilience"*

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Framework Alignment](#framework-alignment)
- [Assessment Structure](#assessment-structure)
- [Question Distribution](#question-distribution)
- [ERMITS Ecosystem Integration](#ermits-ecosystem-integration)
- [Access & Deployment](#access--deployment)
- [Recent Enhancements](#recent-enhancements)
- [Documentation](#documentation)
- [License](#license)

## Overview

The STEEL™ Assessment Platform is an executive-level cybersecurity assessment tool that integrates PESTEL (Political, Economic, Social, Technological, Environmental, Legal) analysis with comprehensive threat landscape intelligence. The platform is designed to align with leading international risk management and cybersecurity frameworks, providing organizations with a structured approach to evaluating their strategic threat environment.

STEEL enables security leaders and risk management professionals to conduct thorough assessments, generate actionable insights, and develop strategic recommendations aligned with enterprise risk management best practices. The platform evaluates 46 strategic indicators across six macro categories, delivering a quantifiable, board-ready view of enterprise risk.

## Key Features

- **Comprehensive Assessment**: 46 strategically designed questions across 6 PESTEL factors
- **Enterprise Risk Management Integration**: Enhanced alignment with risk appetite frameworks and business continuity planning
- **Modern Security Architecture Evaluation**: Assessment of Zero Trust principles and supply chain security posture
- **Automated Scoring Engine**: Weighted calculations providing objective risk level indicators (0-100 scale)
- **Interactive Results Dashboard**: Visual risk level indicators with comprehensive interpretation guidance
- **Strategic Recommendations**: Actionable next steps with risk register integration capabilities
- **ERMITS Ecosystem Integration**: Automatic sync with ERMITS platforms (CyberCaution, CyberCorrect, VendorSoluce, etc.)
- **Dashboard Integration**: Real-time results synchronization with ERMITS Dashboard via localStorage
- **Export Functionality**: PDF and JSON export options for documentation and integration purposes
- **Progress Persistence**: Automatic save/load functionality with LocalStorage
- **Privacy-First Architecture**: Client-side processing with Subresource Integrity (SRI) protection for CDN resources
- **Data Protection**: Built-in privacy controls with data deletion functionality
- **Board-Ready Reporting**: Executive-level insights suitable for C-suite and board presentations

## Framework Alignment

STEEL is designed to align with the following international standards and frameworks:

- **ISO 31000:2018** - Risk Management Guidelines
- **COSO ERM Framework** - Enterprise Risk Management
- **NIST Cybersecurity Framework (CSF) 2.0** - Cybersecurity best practices
- **NIST Risk Management Framework (RMF)** - Risk management processes
- **ISO/IEC 27001:2022** - Information Security Management Systems

This alignment ensures that assessment results are compatible with established enterprise risk management processes and can be integrated into existing governance, risk, and compliance (GRC) workflows.

## Assessment Structure

The assessment is organized into six PESTEL categories, each designed to evaluate different dimensions of an organization's threat environment:

1. **Political Factors**: Regulatory compliance, geopolitical risks, governance structures, and risk appetite
2. **Economic Factors**: Financial risk exposure and economic threat vectors
3. **Social Factors**: Human factors, social engineering risks, and organizational culture
4. **Technological Factors**: Technology infrastructure, Zero Trust architecture, and supply chain security
5. **Environmental Factors**: Physical security, business continuity, disaster recovery capabilities, and ESG considerations
6. **Legal Factors**: Legal and regulatory compliance, contractual obligations, and liability management

## Question Distribution

The assessment includes 46 questions distributed across the PESTEL framework:

| Category | Questions | Key Focus Areas |
|----------|-----------|-----------------|
| **Political** | 8 | Risk appetite, regulatory compliance, governance, geopolitical risks |
| **Economic** | 7 | Financial risk, economic threat vectors, market exposure |
| **Social** | 7 | Human factors, social engineering, culture, awareness |
| **Technological** | 9 | Zero Trust, supply chain security, infrastructure, automation |
| **Environmental** | 8 | Business continuity, disaster recovery, physical security, ESG |
| **Legal** | 7 | Compliance, contractual obligations, liability, privacy |

### Scoring Methodology

- **Factor Scores**: Each PESTEL category is scored on a 0-100 scale
- **Weighted Composite Score**: Calculated using calibrated weights:
  - Political: 1.0
  - Economic: 1.0
  - Social: 1.0
  - Technological: 1.2 (higher weight for emerging threats)
  - Environmental: 0.9
  - Legal: 1.1 (compliance critical)
- **Risk Levels**:
  - **80-100**: LOW RISK (Strong resilience)
  - **60-79**: MODERATE RISK (Good foundation, room for improvement)
  - **40-59**: ELEVATED RISK (Significant gaps requiring attention)
  - **0-39**: HIGH RISK (Critical vulnerabilities, immediate action needed)

## ERMITS Ecosystem Integration

STEEL serves as the intelligence engine for the ERMITS ecosystem, feeding consistent risk intelligence to all ERMITS platform solutions:

- **CyberCaution**: Ransomware readiness and threat forecasts based on technological risk profile
- **CyberCorrect**: Privacy exposure and regulatory gaps identified through STEEL assessment
- **CyberSoluce**: NIST CSF-aligned maturity mapping derived from strategic risk scores
- **VendorSoluce**: Vendor exposure scoring and TPRM informed by legal and operational risk factors
- **TechnoSoluce**: SBOM risk and component vulnerabilities aligned to technological maturity
- **ImpactSoluce**: Sustainability, ESG, and supply chain climate risks from environmental assessment
- **EduSoluce**: Training aligned to risk profile and social factor maturity
- **SocialCaution**: Public-facing privacy understanding based on social and legal risk exposure
- **vCISO Services**: Strategic advisory to guide implementation and program development

**Cross-Product Intelligence**: ERMITS Advisory ensures that every tool uses the same STEEL intelligence base, eliminating fragmentation and inconsistent scoring across departments.

### Dashboard Integration

Assessment results automatically sync with the ERMITS Dashboard via localStorage, enabling:
- Real-time monitoring and updates
- Historical trend analysis
- Cross-platform data consistency
- Seamless workflow integration

## Access & Deployment

### Production Environment
- **Live Platform**: [https://ermits-advisory.com/steel/](https://ermits-advisory.com/steel/)

### Source Code
- **Repository**: [GitHub Repository](https://github.com/Facely1er/ermits-advisory.com/tree/main/public/steel)

### Technical Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js 4.4.0
- **PDF Generation**: jsPDF 2.5.1
- **Icons**: Lucide Icons
- **Fonts**: Inter (Google Fonts)
- **Storage**: HTML5 LocalStorage (client-side only)
- **Security**: Subresource Integrity (SRI) for all CDN resources

## Recent Enhancements

### November 2024
- **Branding Update**: Updated to "Strategic Threat & Enterprise Evaluation Layer" with new tagline
- **Enhanced ERM Framework Integration**: Added comprehensive ERM framework references and user guidance
- **Strategic Questions**: Implemented 4 additional strategic assessment questions:
  - Risk Appetite evaluation (Q43)
  - Zero Trust architecture assessment (Q44)
  - Supply chain security evaluation (Q45)
  - Business continuity and disaster recovery (BC/DR) assessment (Q46)
- **Dashboard Integration**: Implemented automatic results synchronization with ERMITS Dashboard
- **Enhanced Results Dashboard**: Added score interpretation guide and next steps call-to-action
- **ERMITS Ecosystem Integration**: Added pathway information connecting STEEL to all ERMITS platforms
- **Security Enhancements**: Implemented Subresource Integrity (SRI) for enhanced CDN security
- **Privacy Controls**: Added privacy notice and data deletion functionality
- **UI/UX Improvements**: Enhanced visual design with modern animations and improved interactivity
- **Progress Tracking**: Added automatic save/load functionality with progress persistence

## Documentation

For detailed framework alignment analysis and technical documentation, refer to:
- `STEEL_FRAMEWORK_REVIEW.md` - Complete framework alignment analysis
- `STEEL_Implementation_Summary.md` - Technical implementation details
- `STEEL_Enhancement_Summary.md` - Recent enhancement documentation

## License

© 2024 ERMITS Corporation. All Rights Reserved.

---

*For questions, support, or additional information, please contact ERMITS Corporation.*
