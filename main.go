package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"strconv"
)

// ScoreInfo represents the score data received from the client.
type ScoreInfo struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
	Time  string `json:"time"`
}

func main() {
	http.HandleFunc("/formSubmit", handleForm)
	http.ListenAndServe(":8080", nil)
}

func handleForm(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")


	// Parse the multipart form data
	// err := r.ParseMultipartForm(100)
	// if err != nil {
	// 	http.Error(w, "Failed to parse multipart form data", http.StatusBadRequest)
	// 	return
	// }

	// Access the form values
	userName := r.FormValue("userName")
	score, _ := strconv.Atoi(r.FormValue("score"))
	time := r.FormValue("time")

	var data []ScoreInfo

	if userName != "" && score != 0 && time != "" {
		// Create a ScoreInfo object
		newScore := ScoreInfo{
			Name:  userName,
			Score: score,
			Time:  time,
		}
		// Append the new score to the JSON file, Retrieve the sorted data
		data = AppendToJSON(newScore, true)
	} else {
		data = AppendToJSON(ScoreInfo{}, false)
	}

	// Convert the response data to JSON
	responseJSON, err := json.Marshal(data)
	if err != nil {
		http.Error(w, "Failed to convert response to JSON", http.StatusInternalServerError)
		return
	}

	// Set the response headers
	w.Header().Set("Content-Type", "application/json")

	// Send the JSON response
	w.Write(responseJSON)
}

func AppendToJSON(score ScoreInfo, flag bool) []ScoreInfo {
	filePath := "./static/data/scores.json"

	// Read the existing JSON file
	existingData, err := ioutil.ReadFile(filePath)
	if err != nil {
		log.Fatal(err)
	}

	var scores []ScoreInfo
	if len(existingData) > 0 {
		// Unmarshal the existing JSON data into a slice of Score
		err = json.Unmarshal(existingData, &scores)
		if err != nil {
			log.Fatal(err)
		}
	}

	if flag {
		// Append the new score to the slice
		scores = append(scores, score)
	}

	// Marshal the updated scores slice to JSON
	jsonData, err := json.Marshal(scores)
	if err != nil {
		log.Fatal(err)
	}

	// Write the updated JSON data back to the file, overwriting the existing content
	err = ioutil.WriteFile(filePath, jsonData, 0644)
	if err != nil {
		log.Fatal(err)
	}

	// Sort the scores in descending order based on the score value
	sort.SliceStable(scores, func(i, j int) bool {
		return scores[i].Score > scores[j].Score
	})

	return scores
}
