package mangerkey

import (
	"API/Database"
	"API/encode"
	"API/historykey"
	"database/sql"
	"math/rand"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

var MangerkeyDb *sql.DB

func ChangeNickName(c *gin.Context) {
	MangerkeyDb, _ = Database.GetDB()
	idaccountkey := c.PostForm("idaccountkey")
	namechange := c.PostForm("name")
	query := "UPDATE accounts_has_key SET nickname = ? WHERE id = ?"
	row := MangerkeyDb.QueryRow(query, namechange, idaccountkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	c.JSON(200, gin.H{"status": 200, "data": "You change name is " + namechange})
	MangerkeyDb.Close()
}

func GenKey(c *gin.Context) {
	MangerkeyDb, _ = Database.GetDB()
	min := 100000 // 6-digit number starts with 100000
	max := 999999 // 6-digit number ends with 999999
	randomNumber := rand.Intn(max-min+1) + min
	strNum := strconv.Itoa(randomNumber)

	codeKey := c.PostForm("codeKeypp")
	query := "UPDATE mykey SET shareKey = ? WHERE (codeKey = ?);"
	row := MangerkeyDb.QueryRow(query, strNum, codeKey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	historykey.ReportSend(codeKey, "Host genarete sherekey :****"+strNum[5:])
	c.JSON(200, gin.H{"status": 200, "shareKey": strNum}) //we can use shareKey in react
	MangerkeyDb.Close()
}

func DeleteKey(c *gin.Context) {
	MangerkeyDb, _ = Database.GetDB()
	codeKey := c.PostForm("codeKeypp")
	query := "UPDATE mykey SET shareKey = null WHERE (codeKey = ?);"
	row := MangerkeyDb.QueryRow(query, codeKey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": row.Err().Error()})
		return
	}
	historykey.ReportSend(codeKey, "Host Delete shereKey")
	c.JSON(200, gin.H{"status": 200}) //we can use shareKey in react
	MangerkeyDb.Close()
}

func ConnectionKey(c *gin.Context) {
	MangerkeyDb, _ = Database.GetDB()
	keyKey := c.PostForm("key")
	user := c.PostForm("user")
	query1 := "select codeKey,shareKey,idhostkey,(select id from accounts where email= ?) from mykey where codeKey =? or shareKey =?"
	row := MangerkeyDb.QueryRow(query1, user, keyKey, keyKey)
	var shareKey sql.NullString
	var idhostkey sql.NullInt16
	var codeKey string
	var id int
	err := row.Scan(&codeKey, &shareKey, &idhostkey, &id)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	times := time.Now().Format("15:04:05")
	dataNow := time.Now().Format("2006-01-02")
	idaccountkey := encode.Encode(user + times + dataNow)
	//host key
	if (idhostkey == sql.NullInt16{}) {
		query2 := "UPDATE mykey SET idhostkey = ? WHERE codekey = ?"
		row := MangerkeyDb.QueryRow(query2, id, codeKey)
		if row.Err() != nil {
			c.JSON(500, gin.H{"error": "Error in server. Please try again."})
			return
		}

		query3 := "INSERT INTO accounts_has_key (id,accounts_id, mykey_codeKey) VALUES (?,?, ?);"
		row1 := MangerkeyDb.QueryRow(query3, idaccountkey, id, codeKey)
		if row1.Err() != nil {
			c.JSON(500, gin.H{"error": "Error in server. Please try again."})
			return
		}
		c.JSON(200, gin.H{"status": 200})
		historykey.ReportSend(codeKey, "Host join")
		return
	}
	//connect from shareKey
	if (shareKey != sql.NullString{}) && (shareKey.String == keyKey) {
		if int(idhostkey.Int16) == id {
			c.JSON(500, gin.H{"error": "This key is connected. Please dont put it add"})
			return
		}
		query3 := "INSERT INTO accounts_has_key (id,accounts_id, mykey_codeKey) VALUES (?,?, ?);"
		row2 := MangerkeyDb.QueryRow(query3, idaccountkey, id, codeKey)
		if row2.Err() != nil {
			c.JSON(500, gin.H{"error": "This key is connected. Please dont put it add"})
			return
		}
		c.JSON(200, gin.H{"status": 200})
		historykey.ReportSend(codeKey, encode.Decode(user)+" join Key with sherekey ****"+shareKey.String[4:6])
		return
	} else {
		c.JSON(500, gin.H{"error": "Invalid Key in server. Please try again."})
	}
	MangerkeyDb.Close()
}

func Disconectkey(c *gin.Context) {
	MangerkeyDb, _ = Database.GetDB()
	idaccountkey := c.PostForm("idaccountkey")
	query := "select a.email,ll.mykey_codekey from accounts_has_key ll,accounts a where ll.id = ? and ll.accounts_id = a.id"
	rw := MangerkeyDb.QueryRow(query, idaccountkey)
	var email string
	var codekey string
	rw.Scan(&email, &codekey)
	query = "DELETE FROM accounts_has_key WHERE id = ?"
	row := MangerkeyDb.QueryRow(query, idaccountkey)
	if row.Err() != nil {
		c.JSON(500, gin.H{"error": "Server api error disconnect"})
		return
	}
	c.JSON(200, gin.H{"status": 200, "data": "disconnected!"})
	historykey.ReportSend(codekey, encode.Decode(email)+" disconnect key")
	MangerkeyDb.Close()
}