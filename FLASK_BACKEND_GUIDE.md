# Flask Backend Integration Guide

## Overview
Your React frontend is ready! Now you need to implement these Flask routes and Python modules in your existing project.

## Required Flask Routes

### 1. Email Analyzer Route
```python
@app.route('/api/email-analyze', methods=['POST'])
def analyze_email():
    data = request.get_json()
    email_content = data.get('email_content')
    
    # Your email analysis logic here
    result = email_analyzer.analyze(email_content)
    
    return jsonify({
        'isPhishing': result['is_phishing'],
        'riskScore': result['risk_score'],
        'threatTags': result['threat_tags'],
        'recommendation': result['recommendation']
    })
```

### 2. QR Code Scanner Route
```python
@app.route('/api/scan-qr', methods=['POST'])
def scan_qr():
    if 'qr_image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400
    
    file = request.files['qr_image']
    
    # Your QR scanning logic here
    result = qr_scanner.scan_and_analyze(file)
    
    return jsonify({
        'isMalicious': result['is_malicious'],
        'extractedContent': result['extracted_content'],
        'contentType': result['content_type'],
        'riskScore': result['risk_score'],
        'recommendation': result['recommendation']
    })
```

### 3. Domain Impersonation Route
```python
@app.route('/api/check-domain', methods=['POST'])
def check_domain():
    data = request.get_json()
    domain = data.get('domain')
    
    # Your domain analysis logic here
    result = domain_detector.analyze(domain)
    
    return jsonify({
        'isImpersonating': result['is_impersonating'],
        'suspiciousFeatures': result['suspicious_features'],
        'legitimateDomain': result['legitimate_domain'],
        'riskScore': result['risk_score'],
        'recommendation': result['recommendation']
    })
```

## Required Python Modules

### modules/email_analyzer.py
```python
import re
import string
from typing import Dict, List

class EmailAnalyzer:
    def __init__(self):
        self.phishing_keywords = [
            'urgent', 'immediate', 'click here', 'verify account',
            'suspended', 'limited time', 'act now', 'confirm identity'
        ]
        
    def analyze(self, email_content: str) -> Dict:
        """Analyze email content for phishing characteristics"""
        
        # Extract features
        features = self._extract_features(email_content)
        
        # Calculate risk score
        risk_score = self._calculate_risk_score(features)
        
        # Determine if phishing
        is_phishing = risk_score > 65
        
        # Generate threat tags
        threat_tags = self._generate_threat_tags(features, is_phishing)
        
        # Generate recommendation
        recommendation = self._generate_recommendation(is_phishing)
        
        return {
            'is_phishing': is_phishing,
            'risk_score': risk_score,
            'threat_tags': threat_tags,
            'recommendation': recommendation
        }
    
    def _extract_features(self, content: str) -> Dict:
        """Extract relevant features from email content"""
        content_lower = content.lower()
        
        return {
            'suspicious_keywords': sum(1 for keyword in self.phishing_keywords if keyword in content_lower),
            'url_count': len(re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', content)),
            'urgent_language': any(word in content_lower for word in ['urgent', 'immediate', 'asap', 'quickly']),
            'has_attachments': 'attachment' in content_lower,
            'sender_suspicious': self._check_sender_domain(content)
        }
    
    def _calculate_risk_score(self, features: Dict) -> int:
        """Calculate risk score based on features"""
        score = 0
        score += features['suspicious_keywords'] * 15
        score += features['url_count'] * 10
        score += 25 if features['urgent_language'] else 0
        score += 20 if features['has_attachments'] else 0
        score += 30 if features['sender_suspicious'] else 0
        
        return min(score, 100)
    
    def _generate_threat_tags(self, features: Dict, is_phishing: bool) -> List[str]:
        """Generate threat tags based on analysis"""
        if not is_phishing:
            return ['legitimate']
        
        tags = []
        if features['urgent_language']:
            tags.append('urgent-language')
        if features['url_count'] > 2:
            tags.append('suspicious-links')
        if features['sender_suspicious']:
            tags.append('fake-sender')
        
        return tags if tags else ['potential-phishing']
    
    def _generate_recommendation(self, is_phishing: bool) -> str:
        """Generate recommendation based on analysis"""
        if is_phishing:
            return 'Do not click any links or attachments. Verify sender through alternative means.'
        return 'Email appears safe, but always exercise caution.'
    
    def _check_sender_domain(self, content: str) -> bool:
        """Check if sender domain is suspicious"""
        # Implement sender domain verification logic
        return False

# Usage
email_analyzer = EmailAnalyzer()
```

### modules/qr_scanner.py
```python
import cv2
import numpy as np
from pyzbar import pyzbar
from typing import Dict
import requests
from urllib.parse import urlparse

class QRScanner:
    def __init__(self):
        self.malicious_domains = [
            'bit.ly', 'tinyurl.com', 'short.link'  # Add known malicious domains
        ]
    
    def scan_and_analyze(self, image_file) -> Dict:
        """Scan QR code and analyze for malicious content"""
        
        # Read and decode QR code
        content = self._decode_qr(image_file)
        
        if not content:
            return {
                'is_malicious': False,
                'extracted_content': 'No QR code found',
                'content_type': 'None',
                'risk_score': 0,
                'recommendation': 'No readable QR code detected'
            }
        
        # Analyze content
        analysis = self._analyze_content(content)
        
        return analysis
    
    def _decode_qr(self, image_file) -> str:
        """Decode QR code from image"""
        try:
            # Convert file to numpy array
            file_bytes = np.frombuffer(image_file.read(), np.uint8)
            image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
            
            # Decode QR codes
            qr_codes = pyzbar.decode(image)
            
            if qr_codes:
                return qr_codes[0].data.decode('utf-8')
            
            return None
            
        except Exception as e:
            return None
    
    def _analyze_content(self, content: str) -> Dict:
        """Analyze extracted content for malicious indicators"""
        content_type = self._determine_content_type(content)
        is_malicious = False
        risk_score = 0
        
        if content_type == 'URL':
            is_malicious, risk_score = self._analyze_url(content)
        elif content_type == 'Text':
            is_malicious, risk_score = self._analyze_text(content)
        
        recommendation = self._generate_recommendation(is_malicious, content_type)
        
        return {
            'is_malicious': is_malicious,
            'extracted_content': content,
            'content_type': content_type,
            'risk_score': risk_score,
            'recommendation': recommendation
        }
    
    def _determine_content_type(self, content: str) -> str:
        """Determine if content is URL, text, etc."""
        if content.startswith(('http://', 'https://')):
            return 'URL'
        return 'Text'
    
    def _analyze_url(self, url: str) -> tuple:
        """Analyze URL for malicious indicators"""
        parsed = urlparse(url)
        risk_score = 0
        
        # Check against known malicious domains
        if parsed.netloc in self.malicious_domains:
            risk_score += 80
        
        # Check for URL shorteners
        if any(shortener in parsed.netloc for shortener in ['bit.ly', 'tinyurl', 't.co']):
            risk_score += 40
        
        # Check for suspicious patterns
        if len(url) > 100:
            risk_score += 20
        
        # Additional checks...
        
        return risk_score > 60, min(risk_score, 100)
    
    def _analyze_text(self, text: str) -> tuple:
        """Analyze text content for suspicious patterns"""
        risk_score = 0
        
        # Check for suspicious keywords
        suspicious_words = ['prize', 'winner', 'urgent', 'click', 'claim']
        for word in suspicious_words:
            if word.lower() in text.lower():
                risk_score += 15
        
        return risk_score > 50, min(risk_score, 100)
    
    def _generate_recommendation(self, is_malicious: bool, content_type: str) -> str:
        """Generate recommendation based on analysis"""
        if is_malicious:
            if content_type == 'URL':
                return 'Do not visit this URL - it may be malicious'
            return 'Be cautious with this content'
        return 'QR code appears safe'

# Usage
qr_scanner = QRScanner()
```

### modules/domain_detector.py
```python
import whois
import tldextract
from difflib import SequenceMatcher
from typing import Dict, List

class DomainDetector:
    def __init__(self):
        self.legitimate_domains = [
            'google.com', 'amazon.com', 'microsoft.com', 'apple.com',
            'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com',
            'paypal.com', 'ebay.com', 'walmart.com', 'target.com'
        ]
        
        self.suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.info', '.biz']
    
    def analyze(self, domain: str) -> Dict:
        """Analyze domain for impersonation indicators"""
        
        # Extract domain components
        extracted = tldextract.extract(domain)
        clean_domain = f"{extracted.domain}.{extracted.suffix}"
        
        # Check for impersonation
        impersonation_result = self._check_impersonation(clean_domain)
        
        # Extract additional features
        features = self._extract_features(domain, extracted)
        
        # Calculate risk score
        risk_score = self._calculate_risk_score(impersonation_result, features)
        
        # Generate recommendation
        recommendation = self._generate_recommendation(impersonation_result['is_impersonating'])
        
        return {
            'is_impersonating': impersonation_result['is_impersonating'],
            'suspicious_features': features['suspicious_indicators'],
            'legitimate_domain': impersonation_result['similar_domain'],
            'risk_score': risk_score,
            'recommendation': recommendation
        }
    
    def _check_impersonation(self, domain: str) -> Dict:
        """Check if domain is impersonating a legitimate domain"""
        max_similarity = 0
        most_similar_domain = None
        
        for legit_domain in self.legitimate_domains:
            similarity = SequenceMatcher(None, domain, legit_domain).ratio()
            
            if similarity > max_similarity:
                max_similarity = similarity
                most_similar_domain = legit_domain
        
        # Consider it impersonation if similarity > 0.7 but not exact match
        is_impersonating = 0.7 < max_similarity < 1.0
        
        return {
            'is_impersonating': is_impersonating,
            'similarity_score': max_similarity,
            'similar_domain': most_similar_domain if is_impersonating else None
        }
    
    def _extract_features(self, domain: str, extracted) -> Dict:
        """Extract suspicious features from domain"""
        suspicious_indicators = []
        
        # Check TLD
        if extracted.suffix in self.suspicious_tlds:
            suspicious_indicators.append('Suspicious TLD')
        
        # Check for character substitution (typosquatting)
        if self._has_character_substitution(extracted.domain):
            suspicious_indicators.append('Typosquatting')
        
        # Check domain length
        if len(extracted.domain) > 20:
            suspicious_indicators.append('Unusually long domain')
        
        # Check for multiple hyphens
        if extracted.domain.count('-') > 2:
            suspicious_indicators.append('Multiple hyphens')
        
        # Check for numbers in brand-like domains
        if any(char.isdigit() for char in extracted.domain):
            suspicious_indicators.append('Contains numbers')
        
        return {
            'suspicious_indicators': suspicious_indicators,
            'domain_length': len(extracted.domain),
            'has_hyphens': '-' in extracted.domain,
            'has_numbers': any(char.isdigit() for char in extracted.domain)
        }
    
    def _has_character_substitution(self, domain: str) -> bool:
        """Check for common character substitutions"""
        substitutions = {
            'o': '0', 'i': '1', 'l': '1', 'e': '3', 'a': '@',
            'g': '9', 's': '5', 't': '7'
        }
        
        for char in domain:
            if char in substitutions.values():
                return True
        
        return False
    
    def _calculate_risk_score(self, impersonation_result: Dict, features: Dict) -> int:
        """Calculate overall risk score"""
        score = 0
        
        if impersonation_result['is_impersonating']:
            score += 60
        
        score += len(features['suspicious_indicators']) * 10
        
        if features['domain_length'] > 15:
            score += 15
        
        return min(score, 100)
    
    def _generate_recommendation(self, is_impersonating: bool) -> str:
        """Generate recommendation based on analysis"""
        if is_impersonating:
            return 'Possible domain impersonation detected - verify before visiting'
        return 'Domain appears legitimate'

# Usage
domain_detector = DomainDetector()
```

## Required Python Dependencies

Add these to your requirements.txt:
```
opencv-python
pyzbar
python-whois
tldextract
Pillow
```

## Integration Steps

1. **Install dependencies**: `pip install opencv-python pyzbar python-whois tldextract`

2. **Add modules** to your existing Flask project structure:
   ```
   your-project/
   ├── modules/
   │   ├── email_analyzer.py
   │   ├── qr_scanner.py
   │   └── domain_detector.py
   ├── main.py (your existing Flask app)
   └── ...
   ```

3. **Import and use** in your main Flask app:
   ```python
   from modules.email_analyzer import EmailAnalyzer
   from modules.qr_scanner import QRScanner
   from modules.domain_detector import DomainDetector
   
   # Initialize analyzers
   email_analyzer = EmailAnalyzer()
   qr_scanner = QRScanner()
   domain_detector = DomainDetector()
   ```

4. **Update CORS settings** to allow your React frontend to communicate with Flask:
   ```python
   from flask_cors import CORS
   CORS(app, origins=['http://localhost:5173'])  # Lovable's dev server
   ```

5. **Test the integration** by running both your Flask backend and this React frontend.

## Frontend Integration Notes

- The React frontend sends requests to `/api/` endpoints
- All API responses should match the exact JSON format shown above
- File uploads use FormData for QR code images
- The frontend includes TODO comments showing exactly where to replace simulation with real API calls

Your React frontend is now ready to connect to your Flask backend once you implement these routes and modules!