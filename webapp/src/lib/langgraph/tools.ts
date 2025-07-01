import { tool } from "@langchain/core/tools";
import { prisma } from "../prisma";


export const searchForLeadsTool = tool(async (customer_profile: string) => {
  console.log(`[TOOL CALLED] Searching for leads matching: "${customer_profile}"`);
  
  const dummyLeads = [
    { name: "Innovate Inc.", contact: "ceo@innovate.com", tier: "A" },
    { name: "Tech Solutions LLC", contact: "contact@techsolutions.com", tier: "B" },
    { name: "Future Forward Co.", contact: "partner@ff.co", tier: "A" }
  ];

  return JSON.stringify(dummyLeads);
}, {
    name: "searchForLeads",
    description: "Searches for potential customer leads based on a descriptive profile.",
    schema: {
        type: "object",
        properties: {
            customer_profile: {
                type: "string",
                description: "A detailed description of the ideal customer to search for."
            }
        },
        required: ["customer_profile"]
    }
});


export const saveLeadsToDBTool = tool(async (leads: { name: string, contact: string }[]) => {
  console.log(`[TOOL CALLED] Saving ${leads.length} leads to the database...`);
  
  try {
    const leadsWithStartTime = leads.map(lead => ({
      ...lead,
      startTime: new Date(), 
    }));

    const result = await prisma.meet.createMany({
      data: leadsWithStartTime
    });

    console.log(`[PRISMA] Successfully created ${result.count} new records.`);
    return `Successfully saved ${result.count} leads to the database.`;

  } catch (error) {
    console.error("[PRISMA ERROR] Failed to save leads:", error);
    return "An error occurred while trying to save the leads to the database.";
  }
}, {
    name: "saveLeadsToDB",
    description: "Saves a list of lead objects to the database. The input must be a valid JSON array of lead objects.",
    schema: {
        type: "object",
        properties: {
            leads: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        name: { type: "string" },
                        contact: { type: "string" }
                    },
                    required: ["name", "contact"]
                }
            }
        },
        required: ["leads"]
    }
});
