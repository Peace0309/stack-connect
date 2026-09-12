-- =====================================================================
-- SIH PS 101 — demo seed data
-- Run AFTER database/schema.sql:
--     psql -d ps101 -f database/schema.sql
--     psql -d ps101 -f database/seed.sql
--
-- Password hashes below are bcrypt hashes of the documented demo
-- passwords (Demo@123 / Admin@123). Regenerate for any real deployment.
-- =====================================================================

BEGIN;

-- ---------------------------------------------------------------------
-- Roles and departments
-- ---------------------------------------------------------------------
INSERT INTO roles (code, name, description) VALUES
  ('employee', 'Officer / Employee', 'Statistical officer taking assessments and courses'),
  ('admin', 'Administrator', 'Capacity-building administrator with workforce analytics access');

INSERT INTO departments (name, state) VALUES
  ('Official Statistics Division', NULL),
  ('National Accounts Division', NULL),
  ('Price Statistics Division', NULL),
  ('Field Operations Division', NULL),
  ('Data Informatics & Innovation Division', NULL),
  ('State Directorate of Economics & Statistics', 'Maharashtra');

-- ---------------------------------------------------------------------
-- Competency framework — 20 competencies, levels 1-5
-- ---------------------------------------------------------------------
INSERT INTO competencies (id, name, category, description, required_level, is_emerging) VALUES
  ('survey-design',            'Survey Design',                            'Statistical', 'Designing household and enterprise surveys, questionnaire construction and pilot testing.', 5, FALSE),
  ('sampling',                 'Sampling Techniques',                      'Statistical', 'Probability sampling, stratification, multi-stage designs and weight estimation.', 5, FALSE),
  ('national-accounts',        'National Accounts',                        'Statistical', 'GDP compilation, SNA 2008 concepts, supply-use tables.', 4, FALSE),
  ('price-statistics',         'Price Statistics',                         'Statistical', 'CPI/WPI construction, index number theory and base revision.', 4, FALSE),
  ('data-quality',             'Data Quality Assurance',                   'Statistical', 'Editing, imputation, non-sampling error control and quality frameworks.', 5, FALSE),
  ('econometrics',             'Econometrics & Forecasting',               'Statistical', 'Regression, time-series modelling and seasonal adjustment.', 3, FALSE),
  ('official-stats-standards', 'Official Statistics Standards',            'Statistical', 'UN Fundamental Principles, NQAF and classification standards.', 4, FALSE),
  ('python',                   'Python for Data Analysis',                 'Technical', 'pandas, numpy and reproducible analysis pipelines.', 4, TRUE),
  ('r-stats',                  'R for Statistical Computing',              'Technical', 'R programming, survey package and reporting with R Markdown.', 3, FALSE),
  ('sql',                      'SQL & Data Management',                    'Technical', 'Relational modelling, joins, aggregation and query optimisation.', 4, FALSE),
  ('ai-ml',                    'AI / Machine Learning',                    'Technical', 'Supervised learning, model validation and responsible AI in official statistics.', 4, TRUE),
  ('gis',                      'GIS & Geospatial Analysis',                'Technical', 'Spatial data handling, geo-coding and thematic mapping.', 3, TRUE),
  ('big-data',                 'Big Data & Alternative Sources',           'Technical', 'Administrative data, web-scraped data and scalable processing.', 3, TRUE),
  ('data-viz',                 'Data Visualisation',                       'Technical', 'Dashboards, statistical graphics and dissemination products.', 4, TRUE),
  ('cybersecurity',            'Cyber Security & Data Protection',         'Digital Governance', 'Information security, DPDP Act obligations and confidentiality.', 4, TRUE),
  ('e-governance',             'e-Governance & Digital Public Infrastructure', 'Digital Governance', 'DPI building blocks, API-based service delivery and interoperability.', 3, FALSE),
  ('open-data',                'Open Data & Dissemination',                'Digital Governance', 'NDSAP compliance, metadata standards and machine-readable release.', 3, FALSE),
  ('communication',            'Statistical Communication',                'Behavioural & Managerial', 'Explaining statistics to policy makers, media and citizens.', 4, FALSE),
  ('project-management',       'Project & Field Management',               'Behavioural & Managerial', 'Planning survey rounds, field supervision and resource allocation.', 3, FALSE),
  ('leadership',               'Leadership & Collaboration',               'Behavioural & Managerial', 'Team building, mentoring and inter-departmental coordination.', 3, FALSE);

-- ---------------------------------------------------------------------
-- Users — demo employee and administrator plus a small cohort
-- ---------------------------------------------------------------------
INSERT INTO users (email, password_hash, full_name, designation, grade, division, location, department_id, role_id, learning_hours, joined_on) VALUES
  ('employee@demo.gov.in',
   '$2b$12$Qw8Yx0m0y0aWnJ4nB1yq5uS0hI7yZ9m3P2cU9rQ1oR6jP0xO5m1Ky',   -- Demo@123
   'Ananya Sharma', 'Statistical Officer', 'Group A (Junior Time Scale)',
   'Official Statistics Division', 'New Delhi',
   (SELECT id FROM departments WHERE name = 'Official Statistics Division'),
   (SELECT id FROM roles WHERE code = 'employee'), 42.5, DATE '2021-07-19'),
  ('admin@demo.gov.in',
   '$2b$12$Lp3Vc9k2s8dQ1mT7hR4uEeJ6nZ0aY5wX2bC8vG3fD1sH9tK4mN7Qi',   -- Admin@123
   'R. Venkatesan', 'Deputy Director General (Capacity Building)', 'Group A (SAG)',
   'Training & Capacity Building', 'New Delhi',
   (SELECT id FROM departments WHERE name = 'Data Informatics & Innovation Division'),
   (SELECT id FROM roles WHERE code = 'admin'), 88.0, DATE '2009-03-02'),
  ('m.iyer@demo.gov.in',
   '$2b$12$Qw8Yx0m0y0aWnJ4nB1yq5uS0hI7yZ9m3P2cU9rQ1oR6jP0xO5m1Ky',
   'Meera Iyer', 'Assistant Director', 'Group A', 'National Accounts Division', 'New Delhi',
   (SELECT id FROM departments WHERE name = 'National Accounts Division'),
   (SELECT id FROM roles WHERE code = 'employee'), 27.0, DATE '2019-11-04'),
  ('s.rathore@demo.gov.in',
   '$2b$12$Qw8Yx0m0y0aWnJ4nB1yq5uS0hI7yZ9m3P2cU9rQ1oR6jP0xO5m1Ky',
   'Sunil Rathore', 'Senior Statistical Officer', 'Group B', 'Field Operations Division', 'Nagpur',
   (SELECT id FROM departments WHERE name = 'Field Operations Division'),
   (SELECT id FROM roles WHERE code = 'employee'), 15.5, DATE '2016-06-13'),
  ('k.das@demo.gov.in',
   '$2b$12$Qw8Yx0m0y0aWnJ4nB1yq5uS0hI7yZ9m3P2cU9rQ1oR6jP0xO5m1Ky',
   'Kaushik Das', 'Junior Statistical Officer', 'Group B', 'Price Statistics Division', 'Kolkata',
   (SELECT id FROM departments WHERE name = 'Price Statistics Division'),
   (SELECT id FROM roles WHERE code = 'employee'), 9.0, DATE '2022-01-10');

-- ---------------------------------------------------------------------
-- Baseline competency levels for Ananya Sharma
-- ---------------------------------------------------------------------
INSERT INTO user_competencies (user_id, competency_id, current_level, source) VALUES
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'survey-design', 3, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'sampling', 3, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'national-accounts', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'price-statistics', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'data-quality', 3, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'econometrics', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'official-stats-standards', 3, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'python', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'r-stats', 1, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'sql', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'ai-ml', 1, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'gis', 1, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'big-data', 1, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'data-viz', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'cybersecurity', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'e-governance', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'open-data', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'communication', 3, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'project-management', 2, 'baseline'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'), 'leadership', 2, 'baseline');

-- A few levels for the wider cohort (feeds the admin analytics)
INSERT INTO user_competencies (user_id, competency_id, current_level, source)
SELECT u.id, c.id,
       GREATEST(1, LEAST(5, (c.required_level - ((u.id + LENGTH(c.id)) % 3))))::SMALLINT,
       'baseline'
FROM users u
CROSS JOIN competencies c
WHERE u.email IN ('m.iyer@demo.gov.in', 's.rathore@demo.gov.in', 'k.das@demo.gov.in');

-- ---------------------------------------------------------------------
-- iGOT Karmayogi mock catalogue — 16 courses
-- ---------------------------------------------------------------------
INSERT INTO courses (id, code, title, provider, description, level, duration_hours, format, rating, learners, department_priority, career_relevance, role_relevance) VALUES
  ('igot-101','MoSPI/SAM/101','Advanced Sampling Methods for Large-Scale Surveys','iGOT Karmayogi · NSSTA','Multi-stage designs, weighting, variance estimation and practical field constraints for national rounds.',4,18,'Blended',4.7,4820,0.95,0.90,0.95),
  ('igot-102','MoSPI/SUR/118','Questionnaire Design and Cognitive Testing','iGOT Karmayogi · NSSTA','Build instruments that minimise measurement error, with cognitive interviewing practice.',3,12,'Self-paced',4.5,3310,0.80,0.75,0.90),
  ('igot-103','MoSPI/PY/210','Python for Official Statistics','iGOT Karmayogi · NIC Academy','pandas-based cleaning, tabulation and reproducible statistical production pipelines.',4,24,'Self-paced',4.8,9120,0.90,0.95,0.85),
  ('igot-104','MoSPI/SQL/205','SQL and Data Management for Statistical Systems','iGOT Karmayogi · NIC Academy','Relational modelling of survey data, complex joins, window functions and performance.',3,16,'Self-paced',4.6,7640,0.85,0.85,0.80),
  ('igot-105','MoSPI/AI/301','Applied Machine Learning for Public Data','iGOT Karmayogi · IIM Skill Hub','Model selection, validation, fairness and documentation for AI use in official statistics.',4,30,'Instructor-led',4.6,2870,1.00,0.95,0.80),
  ('igot-106','MoSPI/GIS/150','Geospatial Analysis for Survey Operations','iGOT Karmayogi · ISRO-IIRS','Geo-coding of enumeration blocks, spatial joins and thematic map production.',3,20,'Blended',4.4,1980,0.80,0.70,0.70),
  ('igot-107','MoSPI/SEC/140','Cyber Security and Data Protection in Government','iGOT Karmayogi · CERT-In','DPDP Act duties, statistical confidentiality and secure handling of unit-level data.',3,10,'Self-paced',4.3,12400,0.90,0.70,0.75),
  ('igot-108','MoSPI/NAS/220','National Accounts Statistics: Concepts and Compilation','iGOT Karmayogi · NSSTA','SNA 2008 framework, supply-use tables and GDP estimation in the Indian context.',4,22,'Instructor-led',4.5,1620,0.75,0.80,0.70),
  ('igot-109','MoSPI/CPI/160','Price Index Compilation and Base Revision','iGOT Karmayogi · NSSTA','Index number theory, weight updating and quality adjustment in CPI/WPI.',3,14,'Self-paced',4.2,2110,0.60,0.65,0.65),
  ('igot-110','MoSPI/DQ/175','Data Quality Frameworks and Statistical Editing','iGOT Karmayogi · NSSTA','NQAF-aligned quality assurance, selective editing and imputation strategies.',4,15,'Blended',4.6,3550,0.90,0.80,0.90),
  ('igot-111','MoSPI/VIZ/130','Dashboards and Statistical Dissemination','iGOT Karmayogi · NIC Academy','Design principles for statistical graphics, dashboards and machine-readable releases.',3,12,'Self-paced',4.4,5230,0.70,0.75,0.80),
  ('igot-112','MoSPI/R/190','R and the survey Package','iGOT Karmayogi · ISI Extension','Complex survey analysis in R with correct variance estimation.',3,18,'Self-paced',4.3,2440,0.65,0.70,0.70),
  ('igot-113','MoSPI/BD/230','Administrative and Big Data for Statistics','iGOT Karmayogi · NSSTA','Integrating administrative registers and alternative data into official outputs.',4,20,'Blended',4.5,1740,0.85,0.85,0.70),
  ('igot-114','MoSPI/COM/120','Communicating Statistics to Policy Makers','iGOT Karmayogi · LBSNAA','Narrative, uncertainty communication and briefing note craft.',3,8,'Self-paced',4.5,6890,0.60,0.80,0.75),
  ('igot-115','MoSPI/PM/145','Managing Survey Rounds and Field Operations','iGOT Karmayogi · NSSTA','Planning, scheduling and supervising national survey rounds across states.',3,14,'Blended',4.2,2560,0.70,0.70,0.70),
  ('igot-116','MoSPI/ETH/135','Econometric Forecasting and Seasonal Adjustment','iGOT Karmayogi · ISI Extension','ARIMA, X-13 seasonal adjustment and forecast evaluation for official series.',4,16,'Instructor-led',4.4,1490,0.65,0.75,0.65);

INSERT INTO course_competencies (course_id, competency_id, weight) VALUES
  ('igot-101','sampling',1.00), ('igot-101','survey-design',0.60),
  ('igot-102','survey-design',1.00), ('igot-102','data-quality',0.60),
  ('igot-103','python',1.00), ('igot-103','data-viz',0.50),
  ('igot-104','sql',1.00), ('igot-104','big-data',0.50),
  ('igot-105','ai-ml',1.00), ('igot-105','python',0.60),
  ('igot-106','gis',1.00),
  ('igot-107','cybersecurity',1.00), ('igot-107','e-governance',0.50),
  ('igot-108','national-accounts',1.00),
  ('igot-109','price-statistics',1.00),
  ('igot-110','data-quality',1.00), ('igot-110','official-stats-standards',0.60),
  ('igot-111','data-viz',1.00), ('igot-111','open-data',0.60),
  ('igot-112','r-stats',1.00), ('igot-112','sampling',0.50),
  ('igot-113','big-data',1.00), ('igot-113','e-governance',0.50),
  ('igot-114','communication',1.00), ('igot-114','leadership',0.50),
  ('igot-115','project-management',1.00), ('igot-115','leadership',0.50),
  ('igot-116','econometrics',1.00);

-- ---------------------------------------------------------------------
-- Competency assessment — 15 questions
-- ---------------------------------------------------------------------
INSERT INTO assessments (id, title, description, kind, pass_percentage) OVERRIDING SYSTEM VALUE VALUES
  (1, 'Baseline Competency Assessment for Statistical Officers',
      'Fifteen items spanning sampling, survey design, data quality, Python, SQL, GIS, AI/ML and cyber security.',
      'competency', 60);
SELECT setval('assessments_id_seq', (SELECT MAX(id) FROM assessments));

INSERT INTO assessment_questions (assessment_id, competency_id, prompt, options, correct_index, explanation, difficulty, position) VALUES
  (1,'sampling','In a stratified random sample, why are strata formed?','["To make units within each stratum as similar as possible","To make units within each stratum as different as possible","To reduce the number of enumerators required","To avoid the need for sampling weights"]',0,'Strata are built to be internally homogeneous, which lowers within-stratum variance and improves precision.','Medium',1),
  (1,'sampling','What does the design effect (DEFF) measure?','["The cost of the survey design","The variance of a complex design relative to simple random sampling","The response rate of the survey","The number of stages in the design"]',1,'DEFF compares the variance under the actual complex design with that of an SRS of the same size.','Hard',2),
  (1,'survey-design','What is the primary purpose of a pilot survey?','["To publish preliminary estimates","To test the questionnaire and field procedures before the main round","To recruit enumerators","To fix the sampling frame permanently"]',1,'Piloting exposes ambiguous questions, timing issues and field procedure problems before full deployment.','Easy',3),
  (1,'survey-design','A double-barrelled question is problematic because it','["takes longer to read aloud","asks about two issues in a single item, so the answer is ambiguous","cannot be translated","requires open-ended coding"]',1,'Two concepts in one item make it impossible to attribute the response to either.','Medium',4),
  (1,'data-quality','Non-sampling error includes all of the following EXCEPT','["measurement error","non-response error","processing error","sampling variance"]',3,'Sampling variance arises from observing a sample rather than the whole population; the others are non-sampling errors.','Medium',5),
  (1,'data-quality','Selective editing means','["editing every record manually","prioritising records whose errors most affect key aggregates","deleting outliers automatically","editing only the first wave of data"]',1,'Selective editing focuses scarce review effort on records with the highest potential impact on published totals.','Hard',6),
  (1,'official-stats-standards','The UN Fundamental Principles of Official Statistics require that','["statistics be released only to the government","confidentiality of individual data be strictly guaranteed","all statistics be produced by a single agency","microdata never be archived"]',1,'Principle 6 guarantees that individual data are used exclusively for statistical purposes and kept confidential.','Easy',7),
  (1,'python','In pandas, df.groupby("state")["income"].mean() returns','["a DataFrame of all columns","a Series of mean income per state","the overall mean income","a list of state names"]',1,'Selecting one column after groupby and aggregating yields a Series indexed by the grouping key.','Easy',8),
  (1,'python','Which pandas method is best for reshaping long survey data to wide?','["concat","pivot","sort_values","astype"]',1,'pivot (or pivot_table) reshapes long records into a wide layout by index and column keys.','Medium',9),
  (1,'sql','Which SQL clause filters rows AFTER aggregation?','["WHERE","HAVING","ORDER BY","LIMIT"]',1,'HAVING applies to grouped results; WHERE filters rows before grouping.','Easy',10),
  (1,'sql','A LEFT JOIN returns','["only matching rows from both tables","all rows from the left table plus matches from the right","all rows from both tables","only rows unique to the left table"]',1,'LEFT JOIN preserves every left-table row, filling unmatched right-table columns with NULL.','Medium',11),
  (1,'gis','Geo-coding enumeration blocks primarily helps to','["reduce questionnaire length","assign field units to precise locations for supervision and mapping","eliminate the need for sampling weights","increase the response rate automatically"]',1,'Coordinates allow route planning, supervision and spatial presentation of results.','Medium',12),
  (1,'ai-ml','Overfitting is best detected by','["a high training accuracy with poor validation accuracy","a low training accuracy","a large dataset","a small number of features"]',0,'A model that memorises training data performs well in-sample and poorly on held-out data.','Medium',13),
  (1,'ai-ml','Before using a machine-learning model in an official statistical output you must first','["publish the model weights","document and validate the model, including bias and uncertainty","increase the sample size to the population","remove all metadata"]',1,'Responsible AI in official statistics requires validation, documentation and transparency about uncertainty.','Hard',14),
  (1,'cybersecurity','Under the DPDP framework, unit-level survey data should be','["shared freely on request","released only after anonymisation and under strict access control","emailed to partner departments as spreadsheets","stored on personal devices for convenience"]',1,'Confidentiality obligations require anonymisation and controlled access for unit-level records.','Easy',15);

-- ---------------------------------------------------------------------
-- Training records
-- ---------------------------------------------------------------------
INSERT INTO training_history (user_id, course_id, status, progress, hours_logged, enrolled_at, completed_at) VALUES
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'),'igot-107','in-progress',60,6.0, DATE '2026-08-02', NULL),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'),'igot-102','completed',100,12.0, DATE '2025-11-15', DATE '2025-12-20'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'),'igot-110','completed',100,15.0, DATE '2025-06-01', DATE '2025-07-08'),
  ((SELECT id FROM users WHERE email='m.iyer@demo.gov.in'),'igot-108','completed',100,22.0, DATE '2025-09-03', DATE '2025-10-30'),
  ((SELECT id FROM users WHERE email='m.iyer@demo.gov.in'),'igot-103','in-progress',35,8.0, DATE '2026-05-11', NULL),
  ((SELECT id FROM users WHERE email='s.rathore@demo.gov.in'),'igot-115','in-progress',45,6.5, DATE '2026-04-22', NULL),
  ((SELECT id FROM users WHERE email='k.das@demo.gov.in'),'igot-109','completed',100,14.0, DATE '2025-12-01', DATE '2026-01-19');

-- ---------------------------------------------------------------------
-- One historical assessment attempt (feeds admin analytics)
-- ---------------------------------------------------------------------
INSERT INTO assessment_attempts (assessment_id, user_id, correct_count, total_questions, per_competency, answers) VALUES
  (1, (SELECT id FROM users WHERE email='employee@demo.gov.in'), 9, 15,
      '{"sampling":{"correct":1,"total":2},"survey-design":{"correct":2,"total":2},"data-quality":{"correct":1,"total":2},"official-stats-standards":{"correct":1,"total":1},"python":{"correct":1,"total":2},"sql":{"correct":2,"total":2},"gis":{"correct":0,"total":1},"ai-ml":{"correct":0,"total":2},"cybersecurity":{"correct":1,"total":1}}'::jsonb,
      '{}'::jsonb);

INSERT INTO notifications (user_id, kind, title, body) VALUES
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'),'assessment','Baseline assessment scored 9/15','Your skill-gap profile and course recommendations have been refreshed.'),
  ((SELECT id FROM users WHERE email='employee@demo.gov.in'),'enrollment','Enrolled in Cyber Security and Data Protection in Government','iGOT Karmayogi · CERT-In (mock API).');

COMMIT;
