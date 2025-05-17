import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for document sections
  app.get("/api/document-sections", async (req, res) => {
    try {
      const sections = await storage.getAllDocumentSections();
      res.json(sections);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document sections" });
    }
  });

  app.get("/api/document-sections/:id", async (req, res) => {
    try {
      const section = await storage.getDocumentSection(parseInt(req.params.id));
      if (!section) {
        return res.status(404).json({ message: "Document section not found" });
      }
      res.json(section);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document section" });
    }
  });

  // API routes for document highlights
  app.get("/api/document-highlights", async (req, res) => {
    try {
      const highlights = await storage.getAllDocumentHighlights();
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document highlights" });
    }
  });

  app.get("/api/document-highlights/:tabCategory", async (req, res) => {
    try {
      const tabCategory = req.params.tabCategory;
      const highlights = await storage.getDocumentHighlightsByTab(tabCategory);
      res.json(highlights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch document highlights" });
    }
  });

  app.post("/api/document-highlights", async (req, res) => {
    try {
      const newHighlight = await storage.createDocumentHighlight(req.body);
      res.status(201).json(newHighlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to create document highlight" });
    }
  });

  app.put("/api/document-highlights/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedHighlight = await storage.updateDocumentHighlight(id, req.body);
      if (!updatedHighlight) {
        return res.status(404).json({ message: "Document highlight not found" });
      }
      res.json(updatedHighlight);
    } catch (error) {
      res.status(500).json({ message: "Failed to update document highlight" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
