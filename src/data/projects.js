// Media fields:
//   image     — card thumbnail (public/photos/)
//   demoVideo — the recording, played in-page by the modal's VideoPlayer.
//               Its presence is what shows the "Watch Demo" button.
//   poster    — first frame shown before playback (public/posters/, generated
//               from the video itself) so a demo never opens on a flat gradient.
//   demoLink  — an external *live* deployment, if one exists. Never the .mp4:
//               a raw video file dumped in a new tab loses the visitor.

export const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'ai-ml', label: 'AI/ML' },
  { id: 'deep-learning', label: 'Deep Learning' },
  { id: 'nlp', label: 'NLP' },
  { id: 'generative-ai', label: 'Generative AI' },
  { id: 'computer-vision', label: 'Computer Vision' },
  { id: 'software', label: 'Software' },
]

const projects = [
  {
    id: 'medforecast',
    title: 'MedForecast',
    type: 'Healthcare AI · Published Research',
    category: ['ai-ml', 'software'],
    tagline:
      'Web-based predictive healthcare system that forecasts disease risk from blood-test data.',
    description:
      'A published web-based platform that predicts diseases from patient blood-test data using machine learning models — identifying risk patterns early so clinicians and patients can act sooner.',
    problem:
      'Many diseases progress silently until symptoms appear. Routine blood-test data contains early risk signals, but patients and clinicians rarely have tools that interpret them into actionable, personalized risk insights.',
    approach:
      'Built supervised ML models over structured patient blood-test datasets, trained and evaluated for predictive accuracy, then wrapped them in a scalable Django backend with a real-time prediction API and a clean web interface.',
    architecture: [
      { step: '01', title: 'Data Ingestion', desc: 'Structured blood-test & patient records normalized into a relational schema.' },
      { step: '02', title: 'Feature Engineering', desc: 'Clinical feature selection and transformations to expose predictive signals.' },
      { step: '03', title: 'ML Models', desc: 'Supervised classifiers trained and validated on historical patient outcomes.' },
      { step: '04', title: 'Prediction API', desc: 'Django REST backend serving real-time risk predictions.' },
      { step: '05', title: 'Web Dashboard', desc: 'Responsive UI where users input reports and receive personalized recommendations.' },
    ],
    technologies: ['Python', 'Django', 'PostgreSQL', 'MongoDB', 'OpenCV', 'Scikit-learn'],
    contribution: [
      'End-to-end design and development — from data pipeline to deployment.',
      'Model training, evaluation, and tuning for predictive accuracy.',
      'REST API and responsive web interface.',
      'Prepared research manuscript for publication.',
    ],
    results: [
      { value: 'Published', label: 'CRC Press (Taylor & Francis) chapter, 2026' },
      { value: 'Real-time', label: 'Scalable prediction backend' },
      { value: 'Early', label: 'Risk detection for preventive intervention' },
    ],
    gradient: ['#3b82f6', '#8b5cf6'],
    image: 'photos/Medforecast.webp',
    demoVideo: 'videos/Medforecast.mp4',
    poster: 'posters/Medforecast.jpg',
    github: 'https://github.com/asqar268008/MedForecast',
    demoLink: null,
    impact: ['CRC Press 2026', 'Preventive Healthcare'],
  },
    {
    id: 'burnout-predictor',
    title: 'Burnout Predictor',
    type: 'Machine Learning · Deployed API',
    category: ['ai-ml', 'software'],
    tagline: 'ML service that classifies developer burnout risk from work and lifestyle signals.',
    description:
      'An end-to-end machine-learning service that classifies burnout risk as Low, Medium or High from eleven work and lifestyle signals — trained across five models and served as a real-time FastAPI prediction endpoint.',
    problem:
      'Burnout is recognised late, usually once someone has already disengaged. The early signals — sleep, work hours, screen time, meeting load, exercise — are measurable well before that point, but they are rarely read together as a single risk picture.',
    approach:
      'Cleaned a 7,000-row dataset of work and lifestyle features, encoded the three-class target, then trained and compared five classifiers — XGBoost, Random Forest, Decision Tree, Gradient Boosting and AdaBoost — before serialising the best performer behind a FastAPI endpoint that returns a burnout label in real time.',
    architecture: [
      { step: '01', title: 'Data Preparation', desc: '7,000 records across 11 work and lifestyle features; missing values imputed by column mean.' },
      { step: '02', title: 'Target Encoding', desc: 'Three-class burnout level (Low / Medium / High) label-encoded for training.' },
      { step: '03', title: 'Model Comparison', desc: 'XGBoost, Random Forest, Decision Tree, Gradient Boosting and AdaBoost benchmarked on an 80/20 split.' },
      { step: '04', title: 'Serialisation', desc: 'Winning classifier bundled with its label encoder via joblib for reuse at inference time.' },
      { step: '05', title: 'Prediction API', desc: 'FastAPI POST /predict validates input with Pydantic and returns both the numeric class and its human-readable label.' },
    ],
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'XGBoost', 'Pandas', 'Pydantic', 'Uvicorn'],
    contribution: [
      'Data cleaning and imputation across the full feature set.',
      'Trained and benchmarked five classifiers to select the strongest.',
      'Built the FastAPI service, request schema, and prediction response.',
      'Packaged model and encoder together so inference matches training exactly.',
    ],
    results: [
      { value: '98.9%', label: 'Accuracy — Gradient Boosting, best of five models' },
      { value: '3-class', label: 'Low / Medium / High burnout risk' },
      { value: 'Real-time', label: 'FastAPI prediction endpoint' },
    ],
    gradient: ['#f472b6', '#8b5cf6'],
    image: 'photos/Burnout.jpg',
    demoVideo: 'videos/Burnout.mp4',
    poster: 'posters/Burnout.jpg',
    github: 'https://github.com/asqar268008/Burnout-Predictor',
    demoLink: null,
    impact: ['5-Model Benchmark', 'Deployed FastAPI Service'],
  },
  {
    id: 'logischain',
    title: 'LogisChain AI',
    type: 'Supply Chain ML · Predictive Analytics',
    category: ['ai-ml'],
    tagline: 'Machine-learning pipeline that predicts supply-chain disruption risk from global logistics data.',
    description:
      'An end-to-end machine-learning pipeline that predicts whether a shipment will hit a supply-chain disruption, built across four real logistics datasets — including the DataCo supply-chain records and World Bank Logistics Performance Index — and benchmarked across four classification models.',
    problem:
      'Supply-chain disruptions are expensive precisely because they are noticed late. The signals that precede them — lead times, port turnaround, geopolitical risk, supplier reliability — sit scattered across separate datasets in incompatible formats, so nobody reads them together until a shipment has already failed.',
    approach:
      'Consolidated four logistics datasets through a six-stage notebook pipeline, engineered temporal and risk-derived features across each source, selected the strongest predictors, then trained and compared Random Forest, Decision Tree, Logistic Regression and XGBoost on a stratified split to find the best disruption classifier.',
    architecture: [
      { step: '01', title: 'Data Understanding', desc: 'Profiled four logistics sources — 180K+ order records, shipment data, resilience data, and World Bank LPI.' },
      { step: '02', title: 'Cleaning', desc: 'Normalized schemas and resolved missing and inconsistent values across sources.' },
      { step: '03', title: 'Exploratory Analysis', desc: 'Mapped disruption patterns against route, supplier, and regional risk factors.' },
      { step: '04', title: 'Feature Engineering', desc: 'Derived Risk_Index, Shipping_Delay, Delivery_Time, Supplier_Reliability_Level, and year-over-year port turnaround changes.' },
      { step: '05', title: 'Feature Selection', desc: 'Narrowed engineered features to the strongest disruption predictors.' },
      { step: '06', title: 'Model Training', desc: 'Random Forest, Decision Tree, Logistic Regression and XGBoost compared on an 80/20 stratified split.' },
    ],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'Pandas', 'NumPy', 'Jupyter'],
    contribution: [
      'Designed the six-stage pipeline from raw datasets through to a trained model.',
      'Engineered temporal, categorical, and risk-derived features across four sources.',
      'Benchmarked four classifiers and selected on ROC-AUC rather than accuracy alone.',
      'Serialized the winning model for reuse.',
    ],
    results: [
      { value: '0.80', label: 'ROC-AUC — Random Forest, best of four models' },
      { value: '0.75', label: 'F1 score on held-out test set' },
      { value: '5,000', label: 'Shipments modelled — 80/20 stratified split' },
    ],
    gradient: ['#f59e0b', '#ef4444'],
    image: 'photos/Logischain.jpg',
    demoVideo: 'videos/Logischain.mp4',
    poster: 'posters/Logischain.jpg',
    github: 'https://github.com/asqar268008/LogisChain-AI',
    demoLink: null,
    impact: ['0.80 ROC-AUC', 'Supply Chain Risk'],
  },
  {
    id: 'brain-tumor',
    title: 'Brain Tumor Prediction',
    type: 'Deep Learning · Medical AI',
    category: ['deep-learning', 'computer-vision'],
    tagline: 'CNN that classifies brain MRI scans into four tumor categories.',
    description:
      'A deep-learning model that classifies brain MRI scans into four categories — glioma, meningioma, pituitary, and non-tumor — automating diagnostic support for radiologists and clinical workflows.',
    problem:
      'Manual MRI review is time-intensive and prone to variability. Radiologists need fast, consistent second opinions to prioritize urgent cases.',
    approach:
      'Designed a convolutional neural network, trained on a labeled MRI dataset, and monitored training with TensorBoard to reach stable, generalizable classification performance across all four classes.',
    architecture: [
      { step: '01', title: 'MRI Preprocessing', desc: 'Resizing, normalization, and augmentation of scan volumes.' },
      { step: '02', title: 'CNN Model', desc: 'Convolutional layers engineered for spatial feature extraction.' },
      { step: '03', title: 'Training', desc: 'Supervised training with TensorBoard for live metric monitoring.' },
      { step: '04', title: 'Classification', desc: '4-class output — glioma, meningioma, pituitary, non-tumor.' },
    ],
    technologies: ['Python', 'PyTorch', 'CNN', 'TensorBoard', 'OpenCV'],
    contribution: [
      'Dataset preparation and preprocessing pipeline.',
      'CNN architecture design and hyperparameter tuning.',
      'Training runs, evaluation, and results analysis.',
    ],
    results: [
      { value: '4-class', label: 'MRI tumor classification' },
      { value: 'Automated', label: 'Diagnostic decision support' },
      { value: 'Tracked', label: 'via TensorBoard experiments' },
    ],
    gradient: ['#22d3ee', '#3b82f6'],
    image: 'photos/Brain-tumor.jpg',
    demoVideo: 'videos/Brain_tumor.mp4',
    poster: 'posters/Brain_tumor.jpg',
    github: 'https://github.com/asqar268008/Brain-tumor-prediction',
    demoLink: null,
    impact: ['4-Class MRI Classification', 'Automated Diagnostics'],
  },
  {
    id: 'floatchat-ai',
    title: 'FloatChat AI',
    type: 'LLM · RAG · Oceanography',
    category: ['nlp', 'generative-ai'],
    tagline: 'RAG-powered system for natural-language queries over oceanographic data.',
    description:
      'An LLM-powered system with Retrieval-Augmented Generation that lets users ask natural-language questions over complex oceanographic datasets — paired with an interactive visualization dashboard for domain experts.',
    problem:
      'Oceanographic datasets are large, technical, and buried in raw formats. Domain experts lack a fast, natural way to ask questions and explore patterns without writing queries.',
    approach:
      'Embedded domain documents into a vector store (ChromaDB) and wired them into a LangChain pipeline so the LLM answers from retrieved context. Added a Django backend and a visualization dashboard for exploration.',
    architecture: [
      { step: '01', title: 'Ingest', desc: 'Oceanographic documents chunked and embedded.' },
      { step: '02', title: 'Vector Store', desc: 'ChromaDB for semantic retrieval.' },
      { step: '03', title: 'RAG Pipeline', desc: 'LangChain retrieves context, LLM generates grounded answers.' },
      { step: '04', title: 'Backend', desc: 'Django API serving chat + data queries.' },
      { step: '05', title: 'Dashboard', desc: 'Interactive visualization of oceanographic patterns.' },
    ],
    technologies: ['Python', 'Django', 'LangChain', 'ChromaDB', 'PostgreSQL', 'LLMs'],
    contribution: [
      'RAG pipeline design and implementation.',
      'Embedding + retrieval tuning for domain accuracy.',
      'Backend API and visualization dashboard.',
    ],
    results: [
      { value: 'Context-aware', label: 'Grounded answers from domain data' },
      { value: 'RAG', label: 'Semantic retrieval over ChromaDB' },
      { value: 'Interactive', label: 'Expert visualization dashboard' },
    ],
    gradient: ['#8b5cf6', '#22d3ee'],
    image: 'photos/Floatchat.jpeg',
    demoVideo: 'videos/Floatchatai.mp4',
    poster: 'posters/Floatchatai.jpg',
    github: 'https://github.com/asqar268008/FloatChat-Ai',
    demoLink: null,
    impact: ['Context-Aware NLP', 'Domain-Specific RAG'],
  },
  {
    id: 'healthagent',
    title: 'HealthAgent',
    type: 'LLM Agent · Personal Health',
    category: ['generative-ai', 'nlp'],
    tagline: 'LLM agent that turns health metrics into personalized, real-time guidance.',
    description:
      'An LLM-based intelligent agent that analyzes user health metrics and delivers personalized recommendations in real time — improving engagement through adaptive, context-aware health insights.',
    problem:
      'Generic health advice ignores an individual\'s actual metrics. People need personalized, actionable guidance grounded in their own numbers — and they need it immediately.',
    approach:
      'Built an LLM agent that ingests user health metrics, reasons over them with the user\'s history and context, and returns concise, personalized recommendations in real time through a Django-backed chat interface.',
    architecture: [
      { step: '01', title: 'Metrics Input', desc: 'User vitals and health history captured.' },
      { step: '02', title: 'Agent Reasoning', desc: 'LLM reasons over personal context.' },
      { step: '03', title: 'Recommendations', desc: 'Personalized, actionable health guidance.' },
      { step: '04', title: 'Delivery', desc: 'Real-time chat experience via Django backend.' },
    ],
    technologies: ['Python', 'Django', 'LangChain', 'PostgreSQL', 'LLMs'],
    contribution: [
      'Agent prompt design and context engineering.',
      'Real-time backend integration.',
      'Personalization logic and UX flow.',
    ],
    results: [
      { value: 'Real-time', label: 'Immediate personalized responses' },
      { value: 'Personalized', label: 'Context-aware recommendations' },
      { value: 'Engaging', label: 'Adaptive conversational UX' },
    ],
    gradient: ['#34d399', '#22d3ee'],
    image: 'photos/Health_agent.jpg',
    demoVideo: 'videos/Health_agent.mp4',
    poster: 'posters/Health_agent.jpg',
    github: 'https://github.com/asqar268008/HealthAgent',
    demoLink: null,
    impact: ['Real-time Decisions', 'Personalized AI'],
  },
]

export default projects