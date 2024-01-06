import { Collapse, Container, Grid } from "@mui/material";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { useState } from "react";

const FAQItems = [
  {
    question: "What are the eligibility criteria for blood donation?",
    answer:
      "Eligibility criteria may vary, but in general, donors must be at least 17 or 18 years old, weigh at least 110 pounds, and be in good health. Certain medical conditions or recent travels may affect eligibility. Please consult with the blood donation center or check their website for specific criteria.",
  },
  {
    question: "How long does the blood donation process take?",
    answer:
      "The process usually takes about 10-15 minutes for the actual blood collection. However, including the registration, screening, and resting time, the entire process might take around 30-60 minutes.",
  },
  {
    question: "Can I donate blood if I have a cold or flu?",
    answer:
      "If you are experiencing symptoms of a cold, flu, or any illness, it is recommended to postpone your donation until you are feeling better. Donating while sick may not be safe for you and could potentially affect the recipient.",
  },
  {
    question: "How often can I donate blood?",
    answer:
      "Typically, whole blood donors can donate every 56 days for men and every 84 days for women. However, this might vary based on donation type, donor health, and local regulations. It is advisable to confirm with the blood donation center about their specific guidelines.",
  },
  {
    question: "Is it safe to donate blood during the COVID-19 pandemic?",
    answer:
      "Yes, it is generally safe to donate blood during the COVID-19 pandemic. Blood donation centers follow strict safety protocols, including donor screening, enhanced disinfection, and social distancing measures, to ensure the safety of donors and staff. If you have recovered from COVID-19 or have been vaccinated, check with the donation center for any specific guidelines.",
  },
];

const FaqSection = () => {
  const [expanded, setExpanded] = useState(false);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div data-aos="fade-up"
    data-aos-duration="1500">
      <Container sx={{ py: 8 }}>
        <SectionTitle
          title="FAQs for Donors"
          subtitle="Find Answers to Common Questions About Blood Donation"
        />
        <Grid
          mt={5}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          {FAQItems.map((item, index) => (
            <Accordion
              
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleAccordionChange(`panel${index}`)}
              elevation={2}
              sx={{ borderRadius: "16px 0 16px 0", py: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon color="primary" fontSize="large" />}
              >
                <Typography variant="h6">{item.question}</Typography>
              </AccordionSummary>
              <Collapse
                in={expanded === `panel${index}`}
                timeout={1000}
                unmountOnExit
              >
                <AccordionDetails>
                  <Typography color="gray">{item.answer}</Typography>
                </AccordionDetails>
              </Collapse>
            </Accordion>
          ))}
        </Grid>

        {/* <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">
              What are the eligibility criteria for blood donation?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Here are some common criteria: (Your detailed answer goes here)
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">
              Is there any age limit for blood donation?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Generally, donors must be between 18 to 65 years old. (Your
              detailed answer goes here)
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography variant="h6">
              Can I donate blood if I have a medical condition?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Some conditions may prevent donation. Consult your doctor for
              guidance. (Your detailed answer goes here)
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4a-content"
            id="panel4a-header"
          >
            <Typography variant="h6">How often can I donate blood?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              For whole blood, typically every 56 days for men and 84 days for
              women. (Your detailed answer goes here)
            </Typography>
          </AccordionDetails>
        </Accordion> */}
      </Container>
    </div>
  );
};

export default FaqSection;
