import React, { useState } from "react";
import styles from "./FAQ.module.scss";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import PageHeader from "../../components/page-header/PageHeader";

const faqs = [
  {
    question: "Quels types de pains proposez-vous ?",
    answer:
      "Nous proposons une large gamme de pains : baguettes, pains traditionnels, pains spéciaux (complets, aux céréales, sans gluten), ainsi que des mini-pains pour vos événements.",
  },
  {
    question: "Vos produits sont-ils 100 % naturels ?",
    answer:
      "Oui, nos pains sont fabriqués avec des ingrédients soigneusement sélectionnés, sans conservateurs ni additifs chimiques.",
  },
  {
    question:
      "Quelle est la différence entre vos produits congelés et surgelés ?",
    answer:
      "Les produits congelés sont refroidis lentement à -18°C, tandis que les produits surgelés sont refroidis très rapidement à -30°C pour préserver au mieux la texture et le goût.",
  },
  {
    question: "Comment conserver vos produits pour qu'ils restent frais ?",
    answer:
      "Nos produits doivent être conservés à -18°C. Une fois décongelés, ils doivent être consommés dans les 24 heures et ne jamais être recongelés.",
  },
  {
    question: "Livrez-vous à domicile ?",
    answer:
      "Oui, nous livrons à Casablanca tous les jours sauf le dimanche et à Rabat tous les jeudis.",
  },
  {
    question: "Y a-t-il un montant minimum de commande pour la livraison ?",
    answer: "Oui, la commande minimum pour la livraison est de 200 DHS.",
  },
  {
    question: "Combien de temps prend la livraison ?",
    answer: "Les commandes sont généralement livrées sous 48 heures.",
  },
  {
    question: "Comment préparer vos pains congelés ?",
    answer:
      "Préchauffez votre four à 180°C - 200°C, faites cuire le pain pendant 10 à 15 minutes, puis laissez-le refroidir avant dégustation.",
  },
  {
    question: "Peut-on cuire le pain au micro-ondes ?",
    answer:
      "Non, nous recommandons uniquement le four pour une texture croustillante et moelleuse.",
  },
  {
    question: "Comment puis-je vous contacter ?",
    answer:
      "Vous pouvez nous joindre par téléphone au 06 XX XX XX XX, par e-mail à contact@assylor.ma ou directement dans notre boutique.",
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = useState(`panel0`);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <section className={styles.main}>
      <div className={styles.container}>
        <PageHeader title="FAQ" />

        <div className={styles.accordions}>
          <div className={styles.accordionsChildren}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  expandIcon={<i class="fi fi-rr-plus"></i>}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <h3 className={styles.question}>{faq.question}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <p className={styles.answer}>{faq.answer}</p>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
