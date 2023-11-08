package historykey

import (
	"database/sql"
	"fmt"

	"github.com/gin-gonic/gin"
)

var HistoryDB *sql.DB

func GetHistory(c *gin.Context) {
	codekey := c.DefaultQuery("codeKey", "")
	rowHistory := c.DefaultQuery("row", "")
	query := "select date , time ,report from history where mykey_codekey = ? order by idhistory desc limit ?"
	row, err := HistoryDB.Query(query, codekey, rowHistory)
	if err != nil {
		// fmt.Println(err.Error())
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	dataHistory := make([]map[string]interface{}, 0)
	for row.Next() {
		var date string
		var time string
		var report string
		err := row.Scan(&date, &time, &report)
		if err != nil {
			c.JSON(500, gin.H{"error": "Internal server error"})
			return
		}
		rowData := map[string]interface{}{
			"date":   date,
			"time":   time,
			"report": report,
		}
		dataHistory = append(dataHistory, rowData)
	}
	c.JSON(200, gin.H{"data": dataHistory})
	row.Close()
}
func GetHistoryWithAccount(c *gin.Context) {
	user := c.DefaultQuery("user", "")
	query := "select mykey_codekey from accounts_has_key AK,accounts A where A.email=? and AK.accounts_id = A.id"
	rows, err := HistoryDB.Query(query, user)
	if err != nil {
		fmt.Println(err.Error())
		c.JSON(500, gin.H{"error": "Database error"})
		return
	}
	dataHistory := make([]map[string]interface{}, 0)
	for rows.Next() {
		var codekey string
		rows.Scan(&codekey)
		query := "select date , time ,report from history where mykey_codekey = ? order by idhistory desc limit 1"
		newRow, _ := HistoryDB.Query(query, codekey)
		for newRow.Next() {
			var date string
			var time string
			var report string
			err := newRow.Scan(&date, &time, &report)
			if err != nil {
				rowData := map[string]interface{}{
					"no": "no report",
				}
				dataHistory = append(dataHistory, rowData)
			} else {
				rowData := map[string]interface{}{
					"date":   date,
					"time":   time,
					"report": report,
				}
				dataHistory = append(dataHistory, rowData)
			}
		}
		newRow.Close()
	}
	c.JSON(200, gin.H{"data": dataHistory})
	rows.Close()
}
